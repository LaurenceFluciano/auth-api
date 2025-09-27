import { UseCaseException } from 'src/templates/context/error/application/usecase.error';

export class UserUseCaseException extends UseCaseException {
  constructor(public message: string) {
    super(message);
    this.name = 'UseCaseException';
    Object.setPrototypeOf(this, UserUseCaseException.prototype);
  }
}
