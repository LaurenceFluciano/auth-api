import { DomainException } from 'src/error/domain.error';
import { InvalidValueObjectException } from 'src/error/value-object.error';

export type TInvalidUserResponse = {
  fields: InvalidValueObjectException[];
};

export class InvalidUserException extends DomainException {
  constructor(public errors: TInvalidUserResponse) {
    super('Invalid User.');
    Object.setPrototypeOf(this, InvalidUserException.prototype);
  }
}
