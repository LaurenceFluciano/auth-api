import { UseCaseException } from 'src/share/context/error/application/usecase.error';

export class AlreadyExistsUserUseCaseError extends UseCaseException {
  constructor() {
    super('User Already Exists');
  }
}
