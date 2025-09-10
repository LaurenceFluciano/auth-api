import {
  TObjectValueError,
  InvalidValueObjectException,
} from 'src/error/value-object.error';

export class InvalidScopesException extends InvalidValueObjectException {
  constructor(public errors: TObjectValueError[]) {
    super('Invalid Scopes.', errors);
  }
}
