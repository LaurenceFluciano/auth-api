import {
  IExternalValidators,
  ObjectValueValidator,
} from 'src/templates/context/domain/validator';

export class ValidatorPin extends ObjectValueValidator {
  constructor(
    protected value: string,
    protected readonly externalValidator?: IExternalValidators,
  ) {
    super(value, externalValidator);
  }

  protected runValidations(): void {
    if (!this.value || this.value.trim() === '') {
      this.addError({
        type: 'Empty',
        message: 'Pin cannot be empty.',
      });
    }

    if (this.value.length < 4 || this.value.length > 6) {
      this.addError({
        type: 'TooShort',
        message: 'Pin must be between 4 and 6 digits.',
        allowValues: '4-6 digits',
      });
    }

    const regexPin = /^[0-9]+$/;

    if (!regexPin.test(this.value)) {
      this.addError({
        type: 'InvalidDigit',
        message: 'Pin must have valid digits.',
        allowValues: '0123456789',
      });
    }

    if (this.externalValidator) {
      this.addManyErrors(...this.externalValidator.runValidations(this.value));
    }
  }
}
