import { UserUseCaseException } from './usecase.exception';

export class AlreadyExistsUserUseCaseError extends UserUseCaseException {
  constructor() {
    super('User Already Exists');
    Object.setPrototypeOf(this, AlreadyExistsUserUseCaseError.prototype);
  }
}
