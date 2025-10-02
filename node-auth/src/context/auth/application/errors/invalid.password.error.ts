import { InvalidUseCaseException } from 'src/templates/context/error/application/usecase.error';
import { InvalidPasswordException } from '../../domain/errors/invalid.password';

export class InvalidPasswordUseCaseError extends InvalidUseCaseException<InvalidPasswordException> {
  constructor(domainError: InvalidPasswordException) {
    super('Invalid Password!', domainError);
  }

  toDto(): object {
    return {
      message: this.domainError.message,
      type: this.domainError.name,
      errors: this.domainError.errors,
    };
  }
}
