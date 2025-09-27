import { Request, Response, NextFunction, RequestHandler } from 'express';

export const asyncRoute =
  (route: (req: Request<any>, res: Response) => Promise<any>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(route(req, res)).catch(next);
  };
