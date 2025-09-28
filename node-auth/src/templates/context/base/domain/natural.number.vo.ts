import {
  InvalidValueObjectException,
  TObjectValueError,
} from '../../error/domain/value-object.error';
import { Either, Left, Right } from '../../error/others/either';

export class NaturalNumber {
  private constructor(private value: number) {}

  public static create(
    value: number,
  ): Either<InvalidValueObjectException, NaturalNumber> {
    if (value < 0) {
      return Left.create(
        new InvalidValueObjectException('Invalid Natural number', [
          {
            type: 'Negative Number Exception',
            message: 'A Natural number must be greater or equal to 0',
          } as TObjectValueError,
        ]),
      );
    }

    return Right.create(new NaturalNumber(value));
  }

  public get() {
    return this.value;
  }
}
