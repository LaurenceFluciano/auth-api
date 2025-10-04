import { Either, Left, Right } from '../error/others/either';
import { ObjectValueValidator, IExternalValidators } from './validator';
import { InvalidValueObjectException } from '../error/domain/value-object.error';

export type Constructor<T> = new (...args: any[]) => T;

interface ValueObjectStatic<
  T,
  TThis extends ValueObject<T>,
  TError extends InvalidValueObjectException,
> {
  new (value: T): TThis;
  Validator: Constructor<ObjectValueValidator>;
  ErrorType: Constructor<TError>;
}

export abstract class ValueObject<T> {
  constructor(private readonly value: T) {}

  public getValue(): T {
    return this.value;
  }

  public static create<
    T,
    TThis extends ValueObject<T>,
    TError extends InvalidValueObjectException,
  >(
    this: ValueObjectStatic<T, TThis, TError>,
    value: T,
    externalValidator?: IExternalValidators,
  ): Either<TError, TThis> {
    const validator = new this.Validator(value, externalValidator);
    if (validator.hasErrors())
      return Left.create(new this.ErrorType(validator.getErrors()));
    return Right.create(new this(value));
  }

  public static fromPersistence<TThis extends ValueObject<any>>(
    this: new (value: any) => TThis,
    value: any,
  ): TThis {
    return new this(value);
  }
}
