import { InvalidUserException } from 'src/context/user/domain/errors/user/user.error';
import { InvalidUseCaseException } from 'src/templates/context/error/application/usecase.error';

export class InvalidUserUseCaseError extends InvalidUseCaseException<InvalidUserException> {
  constructor(entity: InvalidUserException) {
    super('Impossible to create an invalid user.', entity);
  }

  toDto() {
    return {
      message: this.message,
      type: this.entity.message,
      fields: this.entity.errors.fields,
    };
  }
}
