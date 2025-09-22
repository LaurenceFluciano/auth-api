import { UseCaseException } from 'src/error/usecase.error';

export class AlreadyExistsUserUseCaseError extends UseCaseException {
  constructor() {
    super('User Already Exists');
  }
}
