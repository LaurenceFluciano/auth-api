import { InvalidUserException } from 'src/context/user-auth/domain/errors/user.error';
import { InvalidUseCaseException } from 'src/templates/context/error/application/usecase.error';

export class InvalidUserUseCaseError extends InvalidUseCaseException {
  constructor(private domainError: InvalidUserException) {
    super('Impossible to create an invalid user.');
  }

  toDto() {
    return {
      message: this.message,
      type: this.domainError.message,
      fields: this.domainError.fields,
    };
  }
}
