import { UserUseCaseException } from './usecase.exception';

export class NotFoundUserUseCaseError extends UserUseCaseException {
  constructor() {
    super('User Not Found.');
    Object.setPrototypeOf(this, NotFoundUserUseCaseError.prototype);
  }
}
