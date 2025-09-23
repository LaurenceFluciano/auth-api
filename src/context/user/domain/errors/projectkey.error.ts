import {
  TObjectValueError,
  InvalidValueObjectException,
} from 'src/share/error/domain/value-object.error';

export class InvalidProjectKeyException extends InvalidValueObjectException {
  constructor(public errors: TObjectValueError[]) {
    super('Invalid ProjectKey.', errors);
  }
}
