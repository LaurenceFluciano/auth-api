import {
  InternalServerErrorUseCaseException,
  UseCaseException,
} from 'src/templates/context/error/application/usecase.error';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { IAuthFactory, IAuthMethod } from './auth.method.factory';
import { InvalidPasswordUseCaseError } from '../../../user/application/errors/invalid.password.error';
import { IEncryptStrategy } from '../ports/encrypt.port';
import { AuthMethodNotDefinedException } from '../../../user/application/errors/auth.error';
import { TPasswordAuthMethod, TAuths } from '../../domain/entities/types.auth';
import { Password } from '../../domain/values-objects/password.vo';
import { FailPasswordAuthUseCaseError } from '../../../user/application/errors/fail.authenticate';
import { Auth } from '../../domain/entities/auth';

class AuthenticatePassword implements IAuthMethod<{ secret: string }> {
  constructor(private encrypt: IEncryptStrategy) {}

  async authentificate(
    agreggator: Auth,
    credentials: {
      secret: string;
    },
  ): Promise<Either<UseCaseException, null>> {
    if (
      agreggator === undefined ||
      credentials.secret === undefined ||
      !(agreggator instanceof Auth)
    )
      return Left.create(
        new UseCaseException('Impossible to make password auth'),
      );

    const method = agreggator.getAuthMethod('password');

    if (!method)
      return Left.create(
        new AuthMethodNotDefinedException('Password auth method not defined.'),
      );

    const result = await this.encrypt.verifyHash(
      credentials.secret,
      method.secret,
    );

    if (result.isLeft())
      return Left.create(
        new InternalServerErrorUseCaseException('Internal Server error'),
      );

    if (!result.value) return Left.create(new FailPasswordAuthUseCaseError());

    return Right.create(null);
  }
}

export class PasswordAuthMethodFactory implements IAuthFactory {
  constructor(private encrypt: IEncryptStrategy) {}

  async createAuthFactor(
    fields: TPasswordAuthMethod,
  ): Promise<Either<UseCaseException, TAuths>> {
    if (fields.secret === undefined)
      return Left.create(new UseCaseException('Some fields not defined'));

    const passwordOrError = Password.create(fields.secret);
    if (passwordOrError.isLeft())
      return Left.create(
        new InvalidPasswordUseCaseError(passwordOrError.value),
      );
    const hashedPassword = await this.encrypt.hash(
      passwordOrError.value.getValue(),
    );
    if (hashedPassword.isLeft())
      return Left.create(
        new InternalServerErrorUseCaseException('Internal server error.'),
      );
    return Right.create({ password: { secret: hashedPassword.value } });
  }

  createAuthMethod(): IAuthMethod {
    return new AuthenticatePassword(this.encrypt);
  }
}
