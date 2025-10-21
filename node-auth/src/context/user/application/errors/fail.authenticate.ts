import { InvalidUseCaseException } from 'src/templates/context/error/application/usecase.error';

export class FailPasswordAuthUseCaseError extends InvalidUseCaseException {
  constructor() {
    super('Invalid password or entity.!');
  }

  toDto(): object {
    return {
      message: this.message,
    };
  }
}
