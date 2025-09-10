import {
  TObjectValueError,
  InvalidValueObjectException,
} from 'src/error/value-object.error';

export class InvalidNameException extends InvalidValueObjectException {
  constructor(public errors: TObjectValueError[]) {
    super('Invalid Name.', errors);
  }
}
