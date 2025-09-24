import { UseCaseException } from 'src/share/context/error/application/usecase.error';

export class NotFoundUserUseCaseError extends UseCaseException {
  constructor() {
    super('User Not Found.');
  }
}
