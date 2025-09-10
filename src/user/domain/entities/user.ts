import { Email } from '../values-objects/email.vo';
import { Name } from '../values-objects/name.vo';
import { ProjectKey } from '../values-objects/projectkey.vo';
import { Either, Left, Right } from 'src/error/either';
import {
  InvalidUserException,
  TInvalidUserResponse,
} from '../errors/user.error';
import { ValidatorName } from '../validations/name.validator';
import { ValidatorEmail } from '../validations/email.validator';
import { ValidatorProjectKey } from '../validations/projectkey.validator';
import { Scope } from '../values-objects/scope.vo';
import { ValidatorScope } from '../validations/scopes.validator';
import { InvalidValueObjectException } from 'src/error/value-object.error';

export type TUserInput = {
  name: string;
  email: string;
  projectKey?: string;
  scopes?: string[];
};

export type TUserValidators = {
  name: ValidatorName;
  email: ValidatorEmail;
};

export class User {
  private constructor(
    private name: Name,
    private email: Email,
    private projectKey?: ProjectKey,
    private scopes?: Scope[],
  ) {}

  public static create(
    user: TUserInput,
    _validators: TUserValidators = {
      name: new ValidatorName(user.name),
      email: new ValidatorEmail(user.email),
    },
  ): Either<InvalidUserException, User> {
    const errors: TInvalidUserResponse = {
      fields: [],
    };
    const nameOrError = Name.create(user.name, _validators.name);
    const emailOrError = Email.create(user.email, _validators.email);

    if (nameOrError.isLeft()) errors.fields.push(nameOrError.value);
    if (emailOrError.isLeft()) errors.fields.push(emailOrError.value);

    let projectKeyOrError:
      | Either<InvalidValueObjectException, ProjectKey>
      | undefined;
    const scopes: Scope[] = [];

    if (user.projectKey) {
      projectKeyOrError = ProjectKey.create(
        user.projectKey,
        new ValidatorProjectKey(user.projectKey),
      );

      if (projectKeyOrError.isLeft())
        errors.fields.push(projectKeyOrError.value);
    }

    if (user.scopes) {
      for (const scope of user.scopes) {
        const scopeOrError = Scope.create(scope, new ValidatorScope(scope));

        if (scopeOrError.isLeft()) {
          errors.fields.push(scopeOrError.value);
          break;
        }

        scopes.push(scopeOrError.value);
      }
    }

    if (errors.fields.length > 0)
      return Left.create(new InvalidUserException(errors));

    return Right.create(
      new User(
        nameOrError.value as Name,
        emailOrError.value as Email,
        projectKeyOrError?.value as ProjectKey,
        scopes,
      ),
    );
  }

  public getName(): string {
    return this.name.getValue();
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getProjectKey(): string | undefined {
    return this.projectKey?.getValue();
  }

  public getScopes(): string[] | undefined {
    return this.scopes?.map((scope) => scope.getValue());
  }
}
