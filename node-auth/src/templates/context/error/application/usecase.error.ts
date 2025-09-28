import { DomainException } from '../domain/domain.error';
import { ApplicationException } from './application.error';

export class UseCaseException extends ApplicationException {}

export class InvalidUseCaseException<
  T extends DomainException,
> extends UseCaseException {
  constructor(
    public message: string,
    protected entity: T,
  ) {
    super(message);
  }

  public toDto(): object {
    throw new Error('Method "toDto" must be implemented by subclass');
  }
}
export class ConflictUseCaseException extends UseCaseException {}
export class NotFoundUseCaseException extends UseCaseException {}
export class UnprocessableEntityUseCaseException extends UseCaseException {}
