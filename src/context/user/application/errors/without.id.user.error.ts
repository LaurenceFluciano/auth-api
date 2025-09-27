import { UserUseCaseException } from './usecase.exception';

export class UserIdNotDefinedUseCaseError extends UserUseCaseException {
  constructor() {
    super('Have users with id not defined!');
    Object.setPrototypeOf(this, UserIdNotDefinedUseCaseError.prototype);
  }
}
