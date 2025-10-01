import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { InvalidScopesException } from '../../errors/user/scopes.error';
import { ValidatorScope } from '../../validations/user/scopes.validator';
export class Scope {
  protected constructor(private scope: string) {}

  public static create(scope: string): Either<InvalidScopesException, Scope> {
    const validator = new ValidatorScope(scope);
    if (validator.hasErrors())
      return Left.create(new InvalidScopesException(validator.getErrors()));
    return Right.create(new Scope(scope));
  }

  public getValue(): string {
    return this.scope;
  }
}
