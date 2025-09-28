import { NotFoundUseCaseException } from 'src/templates/context/error/application/usecase.error';

export class NotFoundUserUseCaseError extends NotFoundUseCaseException {
  constructor() {
    super('User Not Found.');
  }
}
