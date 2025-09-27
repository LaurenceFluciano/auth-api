/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextFunction, Request, Response } from 'express';
import { ProjectKey } from 'src/context/projects/domain/values-objects/projectkey.vo';

export function projectKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const projectKeyRaw =
    typeof req.body?.projectKey === 'string'
      ? req.body.projectKey
      : typeof req.params?.projectKey === 'string'
        ? req.params.projectKey
        : typeof req.query?.projectKey === 'string'
          ? req.query.projectKey
          : undefined;

  if (!projectKeyRaw) {
    return next(new Error('ProjectKey is required'));
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const projectKeyOrError = ProjectKey.create(projectKeyRaw);
  if (projectKeyOrError.isLeft()) return next(projectKeyOrError.value);

  // adiciona no req
  req.projectKey = projectKeyOrError.value.getValue();
  return next();
}
