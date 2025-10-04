import { Request } from 'express';
import { Pagination } from 'src/templates/context/domain/base/domain/pagination.vo';

declare module 'express' {
  export interface Request {
    pagination: Pagination;
    projectKey: string;
  }
}
