import { TObjectValueError } from 'src/error/value-object.error';

export abstract class ObjectValueValidator {
  private errors: TObjectValueError[] = [];
  protected value: string;

  constructor(value: string) {
    this.value = value;
    this.runValidations();
  }

  protected abstract runValidations(): void;

  protected addError(error: TObjectValueError): void {
    this.errors.push(error);
  }

  public getErrors(): TObjectValueError[] {
    return this.errors;
  }

  public hasErrors(): boolean {
    return this.errors.length !== 0;
  }
}

export interface IExternalValidators {
  runValidations(context: ObjectValueValidator): void;
}
