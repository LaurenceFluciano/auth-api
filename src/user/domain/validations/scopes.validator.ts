import { ObjectValueValidator } from './validator';

export class ValidatorScope extends ObjectValueValidator {
  constructor(protected value: string) {
    super(value);
  }

  static isValidScopePrefix(value: string) {
    return /^([A-Za-z]*)$/.test(value);
  }

  static isValidScopeName(value: string) {
    return /^([A-Za-z0-9_-]+)$/.test(value);
  }

  protected runValidations(): void {
    const parts = this.value.split(':');

    if (parts.length > 2)
      this.addError({
        message: 'Scope must have at most one ":" separating prefix and name.',
        type: 'ExcededMinimumSize',
      });

    const [prefix, name] = parts.length === 2 ? parts : [null, parts[0]];

    if (prefix && !ValidatorScope.isValidScopePrefix(prefix))
      this.addError({
        message: 'Prefix must contain only letters (A-Z, a-z).',
        type: 'InvalidPrefix',
      });

    if (!ValidatorScope.isValidScopeName(name))
      this.addError({
        message: 'Name must contain only letters, numbers, "_" or "-".',
        type: 'InvalidName',
      });
  }
}
