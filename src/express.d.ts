import 'express';

declare module 'express' {
  interface Request {
    projectKey: string;
  }
}