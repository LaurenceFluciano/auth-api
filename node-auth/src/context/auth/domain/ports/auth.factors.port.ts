import { ApplicationException } from 'src/templates/context/error/application/application.error';
import { Either } from 'src/templates/context/error/others/either';

export interface IAuthFactors<T, O> {
  authenticate(credentials: T): MaybePromise<Either<ApplicationException, O>>;
}

export interface IRegisterAuthFactors<T> {
  register(
    userId: Id,
    auth: T,
  ): MaybePromise<Either<ApplicationException, null>>;
}
