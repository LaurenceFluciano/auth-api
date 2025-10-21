import { ValueObject } from 'src/templates/context/domain/value.object';
import { InvalidPasswordException } from '../errors/invalid.password';
import { ValidatorPassword } from '../validations/password.validator';

export class Password extends ValueObject<string> {
  public static Validator = ValidatorPassword;
  public static ErrorType = InvalidPasswordException;
}
