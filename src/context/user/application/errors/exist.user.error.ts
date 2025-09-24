import { UseCaseException } from 'src/templates/context/error/application/usecase.error';

export class AlreadyExistsUserUseCaseError extends UseCaseException {
  constructor() {
    super('User Already Exists');
  }
}
