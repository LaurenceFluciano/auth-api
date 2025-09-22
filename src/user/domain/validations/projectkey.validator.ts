import { ObjectValueValidator } from './validator';

export class ValidatorProjectKey extends ObjectValueValidator {
  constructor(protected value: string) {
    super(value);
    this.runValidations();
  }

  protected runValidations(): void {
    if (!this.value || this.value.trim().length === 0)
      this.addError({
        message: 'Project Key não pode estar vazio.',
        type: 'EmptyValue',
      });

    if (this.value.trim().length < 4)
      this.addError({
        message: 'O tamanho minimo da projectKey deve ser 4.',
        type: 'MinimalLength',
      });
  }
}
