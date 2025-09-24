import {
  TObjectValueError,
  InvalidValueObjectException,
} from 'src/templates/context/error/domain/value-object.error';

export class InvalidEmailException extends InvalidValueObjectException {
  constructor(public errors: TObjectValueError[]) {
    super('Invalid Email.', errors);
  }
}
