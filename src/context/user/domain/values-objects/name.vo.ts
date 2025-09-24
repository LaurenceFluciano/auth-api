import { Either, Left, Right } from 'src/share/context/error/others/either';
import { ValidatorName } from '../validations/name.validator';
import { InvalidNameException } from '../errors/name.error';

export class Name {
  protected constructor(private name: string) {}

  public static create(name: string): Either<InvalidNameException, Name> {
    const validator = new ValidatorName(name);
    if (validator.hasErrors())
      return Left.create(new InvalidNameException(validator.getErrors()));
    return Right.create(new Name(name));
  }

  public getValue(): string {
    return this.name;
  }
}
