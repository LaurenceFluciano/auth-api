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
          : '';

  // IMPROVISING ERROR
  const projectKeyOrError = ProjectKey.create(projectKeyRaw);
  if (projectKeyOrError.isLeft())
    return res.status(400).json({
      message: projectKeyOrError.value.message,
      errors: projectKeyOrError.value.errors,
    });

  // adiciona no req
  req.projectKey = projectKeyOrError.value.getValue();
  return next();
}
