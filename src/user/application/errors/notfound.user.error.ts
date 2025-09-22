import { UseCaseException } from 'src/share/error/application/usecase.error';

export class NotFoundUserUseCaseError extends UseCaseException {
  constructor() {
    super('User Not Found.');
  }
}
