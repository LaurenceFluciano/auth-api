import { UnprocessableEntityUseCaseException } from 'src/templates/context/error/application/usecase.error';

export class UserIdNotDefinedUseCaseError extends UnprocessableEntityUseCaseException {
  constructor() {
    super('Have users with id not defined!');
  }
}
