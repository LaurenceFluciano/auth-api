import { NextFunction, Request, Response } from 'express';
import { PasswordAuthMethodFactory } from 'src/context/user-auth/application/factories/auth.password.factory';
import { BcryptJsEncryptStrategy } from 'src/context/user-auth/infra/encrypt/bcryptjs';

export function authFactorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  /* MIDDLEWARE TEMPORARIO PARA FUNCIONALIDADE INICIAL */
  const auth = (req.headers['x-auth-factor'] as string) ?? undefined;

  if (auth === undefined) {
    req.authFactor = undefined;
    return next();
  }

  if (typeof auth !== 'string')
    return res.status(400).json({
      status: 400,
      message: 'X-Auth-Factor must to be a single string.',
    });

  if (auth === 'password') {
    req.authFactor = new PasswordAuthMethodFactory(
      new BcryptJsEncryptStrategy(),
    );
  } else {
    return res.status(400).json({
      status: 400,
      message: 'Inalid X-Auth-Factor',
      allowAuthFactors: ['password'],
    });
  }

  return next();
}
