import {
  IExternalValidators,
  ObjectValueValidator,
} from '../../../../templates/context/base/domain/validator';

export class ValidatorPassword extends ObjectValueValidator {
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
        message: 'Password cannot be empty',
      });
    }

    if (this.value.length < 6) {
      this.addError({
        type: 'TooShort',
        message: 'Password must be at least 6 characters',
      });
    }

    if (this.externalValidator) {
      this.addManyErrors(...this.externalValidator.runValidations(this.value));
    }
  }
}
