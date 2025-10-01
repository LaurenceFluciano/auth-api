import { IExternalValidators } from 'src/templates/context/base/domain/validator';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { InvalidPasswordException } from '../../errors/auth/invalid.password';
import { ValidatorPassword } from '../../validations/auth/password.validator';

export class Password {
  private constructor(public readonly password: string) {}

  public static create(
    password: string,
    externalValidator?: IExternalValidators,
  ): Either<InvalidPasswordException, Password> {
    const validator = new ValidatorPassword(password, externalValidator);
    if (validator.hasErrors())
      return Left.create(new InvalidPasswordException(validator.getErrors()));
    return Right.create(new Password(password));
  }
}
