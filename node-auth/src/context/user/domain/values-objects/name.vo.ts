import { ValidatorName } from '../validations/name.validator';
import { InvalidNameException } from '../errors/name.error';
import { ValueObject } from 'src/templates/context/domain/value.object';

export class Name extends ValueObject<string> {
  public static Validator = ValidatorName;
  public static ErrorType = InvalidNameException;
}
