/* External */
import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";

/* DTOs */
import { LoginServiceDTO, JWTLoginDTO, AccessTokenReponse, RefreshTokenDto } from "src/application/dtos/auth/auth.dto";

/* AuthService */
import { AuthServiceJWT } from "./auth.jwt.service";
import { CACHE_AUTH_TOKEN } from "src/domain/ports/cache/cache.token";
import { CacheStrategyService } from "src/domain/ports/cache/cache.strategy";
import { SimpleDevice } from "src/domain/entities/auth.entities";
import { JwtService } from "@nestjs/jwt";
import { ID_GENERATE } from "src/domain/ports/code/id.generate.token";
import { IdGenerator } from "src/domain/ports/code/id.generate";
import { ConfigService } from "@nestjs/config";
import { GetUserService } from "../user/get.user.service";
import { GetUserIdDTO } from "src/application/dtos/users/get.user.dto";


@Injectable()
export class SimpleDeviceAuthJWT {
    constructor(
        private readonly authService: AuthServiceJWT,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        @Inject(CACHE_AUTH_TOKEN)
        private readonly cache: CacheStrategyService<SimpleDevice, SimpleDevice>,
        @Inject(ID_GENERATE)
        private readonly generatorId: IdGenerator,
        private readonly userGetService: GetUserService,
    ){}

    async login(dto: LoginServiceDTO, deviceDtoId: string): Promise<JWTLoginDTO> {
        const result = await this.authService.login(dto);

        await this.cache.init()
        const cached = await this.cache.get(result.userId) || {};
        console.log(deviceDtoId)
        cached[deviceDtoId] = {
            accessJti: result.accessJti,
            refreshJti: result.refreshJti,
        };

        await this.cache.set(result.userId, cached as SimpleDevice);

        return result
    }

    async generateAccessToken(refreshTokenDto: RefreshTokenDto, deviceDto: string): Promise<AccessTokenReponse>
    {
        let result;
        try {
            result = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken);
        } catch {
            throw new BadRequestException("Expired or invalid refresh token");
        }

        await this.cache.init()
        const user = await this.cache.get(result.sub);
        if(user === undefined) throw new NotFoundException("User not found.")
        if(!user[deviceDto]) throw new NotFoundException("Invalid token or device.")
        if(user[deviceDto].refreshJti !== result.jti) throw new BadRequestException("Invalid refresh token")

        const accessTokenJti: string = this.generatorId.generateId();
        const userDb = await this.userGetService.getUserByIdWithoutValidation({id: result.sub} as GetUserIdDTO);
        const accessToken = await this.jwtService.signAsync(
            {
                sub: userDb.id,
                email: userDb.email,
                projectKey: userDb.projectKey,
                scopes: userDb.scopes,
                name: userDb.name,
                jti: accessTokenJti
            },
            {
                expiresIn: this.config.get("ACCESS_TOKEN_EXPIRE_IN") || "15m",
            }
        )

        user[deviceDto]["accessJti"] = accessTokenJti;
        await this.cache.set(userDb.id,user);

        return {
            accessToken: accessToken,
            userId: userDb.id
        }
    }
}