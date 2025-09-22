import { UseCaseException } from 'src/error/usecase.error';

export class NotFoundUserUseCaseError extends UseCaseException {
  constructor() {
    super('User Not Found.');
  }
}
