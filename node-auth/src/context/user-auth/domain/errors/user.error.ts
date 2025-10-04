import { DomainException } from 'src/templates/context/error/domain/domain.error';
import { InvalidValueObjectException } from 'src/templates/context/error/domain/value-object.error';

export class InvalidUserException extends DomainException {
  constructor(public fields: InvalidValueObjectException[]) {
    super('Invalid User.');
  }
}
