import {
  TObjectValueError,
  InvalidValueObjectException,
} from 'src/templates/context/error/domain/value-object.error';

export class InvalidNameException extends InvalidValueObjectException {
  constructor(public errors: TObjectValueError[]) {
    super('Invalid Name.', errors);
  }
}
