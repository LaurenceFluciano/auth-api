import { Request } from 'express';
import { IAuthFactory } from 'src/context/user-auth/domain/factories/auth.method.factory';
import { Pagination } from 'src/templates/context/domain/pagination.vo';

declare module 'express' {
  export interface Request {
    pagination: Pagination;
    projectKey: string;
    authFactor?: IAuthFactory;
  }
}
