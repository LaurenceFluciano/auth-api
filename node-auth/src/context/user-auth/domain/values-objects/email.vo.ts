import { ValueObject } from 'src/templates/context/domain/value.object';
import { ValidatorEmail } from '../validations/email.validator';
import { InvalidEmailException } from '../errors/email.error';

export class Email extends ValueObject<string> {
  public static Validator = ValidatorEmail;
  public static ErrorType = InvalidEmailException;
}
