import { NextFunction, Request, Response } from 'express';

export function paginationMiddleware(
  req: Request<object, object, object, { page: number; limit: number }>,
  next: NextFunction,
) {
  try {
    const pagination = {
      limit: new NaturalNumber(req.query.limit ?? 10),
      page: new NaturalNumber(req.query.page ?? 1),
    };

    if (pagination.limit.get() < 5) throw new Error('Limit cannot exceed 50');
    if (pagination.limit.get() > 50) throw new Error('Limit cannot exceed 50');

    req.pagination = pagination;

    return next();
  } catch (err) {
    next(err);
  }
}
