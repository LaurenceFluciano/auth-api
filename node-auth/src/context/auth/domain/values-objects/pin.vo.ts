import { ValueObject } from 'src/templates/context/domain/value.object';
import { InvalidPinException } from '../errors/invalid.pin';
import { ValidatorPin } from '../validations/pin.validator';

export class Pin extends ValueObject<string> {
  public static Validator = ValidatorPin;
  public static ErrorType = InvalidPinException;
}
