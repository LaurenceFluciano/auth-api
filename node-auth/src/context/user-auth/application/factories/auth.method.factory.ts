import { Either } from 'src/templates/context/error/others/either';
import { TAuths } from '../../domain/entities/types.auth';
import { UseCaseException } from 'src/templates/context/error/application/usecase.error';

export interface IAuthMethod<TCredentials = object> {
  authentificate(
    entity: unknown,
    credentials: TCredentials,
  ): MaybePromise<Either<UseCaseException, null>>;
}

export interface IAuthFactory {
  createAuthFactor(
    fields: object,
  ): MaybePromise<Either<UseCaseException, TAuths>>;
  createAuthMethod(): IAuthMethod;
}
