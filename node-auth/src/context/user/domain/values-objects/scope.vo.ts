import { InvalidScopesException } from '../errors/scopes.error';
import { ValidatorScope } from '../validations/scopes.validator';
import { ValueObject } from 'src/templates/context/domain/value.object';

export class Scope extends ValueObject<string> {
  public static Validator = ValidatorScope;
  public static ErrorType = InvalidScopesException;
}
