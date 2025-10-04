import { DomainException } from 'src/templates/context/error/domain/domain.error';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { IEncryptStrategy } from '../../domain/ports/encrypt.port';
import bcrypt from 'bcryptjs';

export class BcryptJsEncryptStrategy implements IEncryptStrategy {
  async hash(value: string): Promise<Either<DomainException, string>> {
    try {
      const hashed = await bcrypt.hash(value, 10);
      return Right.create(hashed);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return Left.create(new DomainException(err.message));
      }
      return Left.create(new DomainException('Unknown error during hashing.'));
    }
  }

  async verifyHash(
    value: string,
    hashedValue: string,
  ): Promise<Either<DomainException, boolean>> {
    try {
      const match: boolean = await bcrypt.compare(value, hashedValue);
      return Right.create(match);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return Left.create(new DomainException(err.message));
      }
      return Left.create(
        new DomainException('Unknown error during verification.'),
      );
    }
  }
}
