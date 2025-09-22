import { ObjectValueValidator } from './validator';

export class ValidatorName extends ObjectValueValidator {
  constructor(protected value: string) {
    super(value);
    this.runValidations();
  }

  protected runValidations(): void {
    if (!this.value || this.value.trim().length <= 2)
      this.addError({
        type: 'InvalidName',
        message: `Invalid name length: The name must have ${2} characters.`,
      });
  }
}
