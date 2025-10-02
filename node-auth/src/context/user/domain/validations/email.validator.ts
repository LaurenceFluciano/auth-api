import {
  IExternalValidators,
  ObjectValueValidator,
} from '../../../../templates/context/base/domain/validator';

export class ValidatorEmail extends ObjectValueValidator {
  constructor(
    protected value: string,
    private readonly externalValidator?: IExternalValidators,
  ) {
    super(value);
    this.runValidations();
  }

  protected runValidations(): void {
    if (!this.value || this.value.trim() === '') {
      this.addError({
        type: 'Empty',
        message: 'Email cannot be empty',
      });
    }

    if (this.value.length < 6) {
      this.addError({
        type: 'TooShort',
        message: 'Email must be at least 6 characters',
      });
    }

    if (!this.value.includes('@')) {
      this.addError({
        type: 'InvalidEmail',
        message: 'Email must contain @ symbol',
      });
    }

    if (this.externalValidator) {
      this.addManyErrors(...this.externalValidator.runValidations(this.value));
    }
  }
}
