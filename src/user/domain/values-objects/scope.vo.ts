import { Either, Left, Right } from 'src/error/either';
import { InvalidScopesException } from '../errors/scopes.error';
import { ValidatorScope } from '../validations/scopes.validator';
export class Scope {
  protected constructor(private scope: string) {}

  public static create(
    scope: string,
    validator: ValidatorScope,
  ): Either<InvalidScopesException, Scope> {
    if (validator.hasErrors())
      return Left.create(new InvalidScopesException(validator.getErrors()));
    return Right.create(new Scope(scope));
  }

  public getValue(): string {
    return this.scope;
  }
}
