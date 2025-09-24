import { UseCaseException } from 'src/templates/context/error/application/usecase.error';

export class NotFoundUserUseCaseError extends UseCaseException {
  constructor() {
    super('User Not Found.');
  }
}
