import { UnprocessableEntityUseCaseException } from 'src/templates/context/error/application/usecase.error';

export class AuthMethodNotDefinedException extends UnprocessableEntityUseCaseException {
  constructor(message: string) {
    super(message);
  }
}
