import { NextFunction, Request, Response } from 'express';
import { NaturalNumber } from 'src/templates/context/base/domain/pagination.vo';

export function paginationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const limit = Number(req.query.limit ?? 10);
    const page = Number(req.query.page ?? 1);

    const pagination = {
      limit: new NaturalNumber(limit ?? 10),
      page: new NaturalNumber(page ?? 1),
    };

    if (pagination.limit.get() < 5) throw new Error('Limit cannot exceed 50');
    if (pagination.limit.get() > 50) throw new Error('Limit cannot exceed 50');

    req.pagination = pagination;

    return next();
  } catch (err) {
    next(err);
  }
}
