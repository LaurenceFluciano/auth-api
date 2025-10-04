import { TObjectValueError } from 'src/templates/context/error/domain/value-object.error';

export abstract class ObjectValueValidator {
  private errors: TObjectValueError[] = [];
  protected value: PrimitiveType;
  protected readonly externalValidator?: IExternalValidators;

  constructor(value: PrimitiveType, externalValidator?: IExternalValidators) {
    this.value = value;
    this.externalValidator = externalValidator;
    this.runValidations();
  }

  protected abstract runValidations(): void;

  protected addError(error: TObjectValueError): void {
    this.errors.push(error);
  }

  protected addManyErrors(...errors: TObjectValueError[]): void {
    this.errors.push(...errors);
  }

  public getErrors(): TObjectValueError[] {
    return this.errors;
  }

  public hasErrors(): boolean {
    return this.errors.length !== 0;
  }
}

export interface IExternalValidators {
  runValidations(field: PrimitiveType): TObjectValueError[];
}
