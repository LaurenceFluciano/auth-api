import { DomainException } from 'src/templates/context/error/domain/domain.error';
import { InvalidValueObjectException } from 'src/templates/context/error/domain/value-object.error';

export type TInvalidUserResponse = {
  fields: InvalidValueObjectException[];
};

export class InvalidUserException extends DomainException {
  constructor(public errors: TInvalidUserResponse) {
    super('Invalid User.');
    Object.setPrototypeOf(this, InvalidUserException.prototype);
  }
}
