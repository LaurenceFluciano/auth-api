import { DomainException } from 'src/templates/context/error/domain/domain.error';
import { Either } from 'src/templates/context/error/others/either';

export interface IEncryptStrategy {
  hash(value: string): MaybePromise<Either<DomainException, string>>;
  verifyHash(
    value: string,
    hashedValue: string,
  ): MaybePromise<Either<DomainException, boolean>>;
}
