import { Injectable, BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CACHE_AUTH_TOKEN } from 'src/cache/domain/interface/cache.token';
import { CacheStrategyService } from 'src/cache/domain/interface/cache.strategy';
import { SimpleDevice } from 'src/auth/domain/auth.entities';


@Injectable()
export class SimpleDeviceLoginProfileGuard implements CanActivate
{
    constructor(
        private readonly jwtService: JwtService,
        @Inject(CACHE_AUTH_TOKEN)
        private readonly cache: CacheStrategyService<SimpleDevice, SimpleDevice>,
    ){}

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const header = request.headers["authorization"] as string;
        const deviceId = request.headers["device-id"] as string;

        if (!header) 
            throw new BadRequestException("Authorization header missing");

        const token = header.split(" ")[1];
        if (!token) 
            throw new BadRequestException("Bearer token missing");

        try {
            const result = await this.jwtService.verifyAsync(token);
            const cached = await this.cache.get(result.sub);
            if (!cached)
                throw new BadRequestException("Invalid or expired accessToken.");
            if(cached[deviceId]["accessJti"] !== result.jti)
                throw new BadRequestException("Invalid or expired accessToken.");

            request.user = result;
            return true;
        } catch (err) {
            throw new BadRequestException("Invalid or expired accessToken.");
        }
    }
} 
