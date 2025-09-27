import { DomainException } from './domain.error';

export type TObjectValueError = {
  type: string;
  message: string;
  allowValues?: string | string[];
  examplePattern?: string | string[];
};

export class InvalidValueObjectException extends DomainException {
  constructor(
    public message: string = 'Invalid Value Object.',
    public errors: TObjectValueError[],
  ) {
    super(message);
    Object.setPrototypeOf(this, InvalidValueObjectException.prototype);
  }
}
