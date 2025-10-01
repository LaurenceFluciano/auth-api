import {
  TObjectValueError,
  InvalidValueObjectException,
} from 'src/templates/context/error/domain/value-object.error';

export class InvalidPasswordException extends InvalidValueObjectException {
  constructor(public errors: TObjectValueError[]) {
    super('Invalid Password.', errors);
  }
}
