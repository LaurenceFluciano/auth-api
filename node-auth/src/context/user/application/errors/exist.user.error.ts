import { ConflictUseCaseException } from 'src/templates/context/error/application/usecase.error';

export class AlreadyExistsUserUseCaseError extends ConflictUseCaseException {
  constructor() {
    super('User Already Exists');
  }
}
