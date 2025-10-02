import { InvalidUserException } from 'src/context/user/domain/errors/user.error';
import { InvalidUseCaseException } from 'src/templates/context/error/application/usecase.error';

export class InvalidUserUseCaseError extends InvalidUseCaseException<InvalidUserException> {
  constructor(domainError: InvalidUserException) {
    super('Impossible to create an invalid user.', domainError);
  }

  toDto() {
    return {
      message: this.message,
      type: this.domainError.message,
      fields: this.domainError.errors.fields,
    };
  }
}
