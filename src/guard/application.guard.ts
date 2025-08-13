import { Injectable, InternalServerErrorException, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import dotenv from "dotenv";

dotenv.config()



@Injectable()
export class ApplicationGuard implements CanActivate
{
  canActivate(
    context: ExecutionContext
): boolean | Promise<boolean> | Observable<boolean> {
    if(!process.env.ROOT_KEY) 
        throw new InternalServerErrorException("Internal Service Error");

    const request = context.switchToHttp().getRequest<Request>();
    const serviceToken = request.headers['secret-key'];

    if (serviceToken && serviceToken === process.env.ROOT_KEY) {
        return true;
    }
    
    throw new UnauthorizedException('Access denied');
  }
} 
