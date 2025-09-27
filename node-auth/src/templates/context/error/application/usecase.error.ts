import { ApplicationException } from './application.error';

export class UseCaseException extends ApplicationException {
  constructor(public message: string) {
    super(message);
    this.name = 'UseCaseException';
    Object.setPrototypeOf(this, UseCaseException.prototype);
  }
}
