import { InvalidUseCaseException } from 'src/templates/context/error/application/usecase.error';
import { InvalidPasswordException } from '../../../auth/domain/errors/invalid.password';

export class InvalidPasswordUseCaseError extends InvalidUseCaseException {
  constructor(private domainError: InvalidPasswordException) {
    super('Invalid Password!');
  }

  toDto(): object {
    return {
      message: this.domainError.message,
      type: this.domainError.name,
      errors: this.domainError.errors,
    };
  }
}
