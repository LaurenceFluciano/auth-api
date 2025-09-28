import { NextFunction, Request, Response } from 'express';
import { Pagination } from 'src/templates/context/base/domain/pagination.vo';

export function paginationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const rawOffset = req.query.offset;
  const rawLimit = req.query.limit;

  const offset = Number(rawOffset ?? 0);
  const limit = Number(rawLimit ?? 10);

  if (isNaN(offset) || isNaN(limit))
    return res.status(400).json({
      message: 'Offset or Limit must to be a single number',
    });

  const pagination = Pagination.create({
    limit: limit,
    offset: offset ?? undefined,
    lastId: req.query.lastId as string | undefined,
  });

  if (pagination.isLeft()) return res.status(400).json(pagination.value);

  req.pagination = pagination.value;

  return next();
}
