import { NextFunction, Request, Response } from 'express';
import { ProjectKey } from 'src/context/projects/domain/values-objects/projectkey.vo';

export function projectKeyMiddleware(
  req: Request<
    { projectKey: string },
    object,
    { projectKey: string },
    { projectKey: string }
  >,
  next: NextFunction,
) {
  const projectKeyOrError = ProjectKey.create(
    req.body.projectKey ?? req.params.projectKey ?? req.query.projectKey,
  );
  if (projectKeyOrError.isLeft()) return next(projectKeyOrError.value);
  req.projectKey = projectKeyOrError.value.getValue();
  next();
}
