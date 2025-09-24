import { Either, Left, Right } from 'src/share/context/error/others/either';
import { ValidatorEmail } from '../validations/email.validator';
import { InvalidEmailException } from '../errors/email.error';
import { IExternalValidators } from '../../../../share/context/base/domain/validator';

export class Email {
  protected constructor(private readonly email: string) {}

  public static create(
    email: string,
    externalValidator?: IExternalValidators,
  ): Either<InvalidEmailException, Email> {
    const validator = new ValidatorEmail(email, externalValidator);
    if (validator.hasErrors())
      return Left.create(new InvalidEmailException(validator.getErrors()));
    return Right.create(new Email(email));
  }

  public getValue(): string {
    return this.email;
  }
}
