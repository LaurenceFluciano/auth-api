import { Request } from 'express';
import { NaturalNumber } from 'src/templates/context/base/domain/pagination.vo';

declare module 'express' {
  export interface Request {
    pagination: {
      limit: NaturalNumber;
      page: NaturalNumber;
    };
    projectKey: string;
  }
}
