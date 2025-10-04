import { NextFunction, Request, Response } from 'express';
import { DtoFieldApplcationException } from 'src/templates/context/error/application/invalid.dto.error';
import {
  ConflictUseCaseException,
  InvalidUseCaseException,
  NotFoundUseCaseException,
  UnprocessableEntityUseCaseException,
  UseCaseException,
} from 'src/templates/context/error/application/usecase.error';

export const handlerError = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (err instanceof Error) {
    console.warn(`[${err.constructor.name}] ${err.message}`);

    if (err instanceof SyntaxError && 'body' in err) {
      return res.status(400).json({ message: 'JSON inválido' });
    }

    if (err instanceof DtoFieldApplcationException) {
      return res.status(400).json(err.toDto());
    }

    if (err instanceof InvalidUseCaseException) {
      return res.status(400).json(err.toDto());
    }

    if (err instanceof ConflictUseCaseException) {
      return res.status(409).json({ message: err.message });
    }

    if (err instanceof NotFoundUseCaseException) {
      return res.status(404).json({ message: err.message });
    }

    if (err instanceof UnprocessableEntityUseCaseException) {
      return res.status(422).json({ message: err.message });
    }

    if (err instanceof UseCaseException) {
      return res.status(500).json({ message: err.message });
    }

    console.error(err.stack);
  } else console.error(err);
  return res
    .status(500)
    .json({ status: 500, message: 'Ocorreu um erro no servidor!' });
};
