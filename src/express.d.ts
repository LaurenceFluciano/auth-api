import 'express';
import { JWTResponse } from './auth/dto/jwt.dto';
import { SafeUserResponseDTO } from './user/dto/response.dto';

declare module 'express' {
  interface Request {
    projectKey: string;
    user?: Partial<SafeUserResponseDTO>
  }
}