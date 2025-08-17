import 'express';
import { JWTResponse } from './auth/application/dtos/jwt.dto';
import { SafeUserResponseDTO } from './user/application/dtos/response.dto';

declare module 'express' {
  interface Request {
    projectKey: string;
    user?: Partial<SafeUserResponseDTO>
  }
}