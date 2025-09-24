import { ApplicationException } from 'src/templates/context/error/application/application.error';

export class NotDefinedFieldDtoException extends ApplicationException {
  constructor(public fields: string[]) {
    super('Some fields not defined.');
  }

  toDto() {
    return {
      message: this.message,
      fields: this.fields,
    };
  }
}
