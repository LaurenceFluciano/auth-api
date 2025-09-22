import { DomainException } from 'src/share/error/domain/domain.error';
import { InvalidValueObjectException } from 'src/share/error/domain/value-object.error';

export type TInvalidUserResponse = {
  fields: InvalidValueObjectException[];
};

export class InvalidUserException extends DomainException {
  constructor(public errors: TInvalidUserResponse) {
    super('Invalid User.');
    Object.setPrototypeOf(this, InvalidUserException.prototype);
  }
}
