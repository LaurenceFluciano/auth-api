import { IExternalValidators } from 'src/templates/context/base/domain/validator';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { InvalidPinException } from '../errors/invalid.pin';
import { ValidatorPin } from '../validations/pin.validator';

export class Pin {
  private constructor(public readonly pin: string) {}

  public static create(
    pin: string,
    externalValidator?: IExternalValidators,
  ): Either<InvalidPinException, Pin> {
    const validator = new ValidatorPin(pin, externalValidator);
    if (validator.hasErrors())
      return Left.create(new InvalidPinException(validator.getErrors()));
    return Right.create(new Pin(pin));
  }
}
