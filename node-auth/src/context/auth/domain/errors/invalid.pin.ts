import {
  TObjectValueError,
  InvalidValueObjectException,
} from 'src/templates/context/error/domain/value-object.error';

export class InvalidPinException extends InvalidValueObjectException {
  constructor(public errors: TObjectValueError[]) {
    super('Invalid Pin.', errors);
  }
}
