import { Request } from 'express';

declare module 'express' {
  export interface Request {
    pagination: {
      limit: NaturalNumber;
      page: NaturalNumber;
    };
    projectKey: string;
  }
}
