// Values Objects
import { Email } from '../values-objects/email.vo';
import { Name } from '../values-objects/name.vo';
import { ProjectKey } from '../values-objects/projectkey.vo';
import { Scope } from '../values-objects/scope.vo';

// Types
import { TUser, TUserValidators } from './type.user';

// Exceptions
import { InvalidValueObjectException } from 'src/share/error/domain/value-object.error';
import {
  InvalidUserException,
  TInvalidUserResponse,
} from '../errors/user.error';
import { Either, Left, Right } from 'src/share/error/either';
import { DomainEvents } from 'src/share/events/domain.events';
import { UserRegisteredEvent } from '../events/user.registered.event';

export class User {
  private constructor(
    private name: Name,
    private email: Email,
    private projectKey?: ProjectKey,
    private scopes?: Scope[],
  ) {}

  public static create(
    user: TUser,
    externalValidators?: TUserValidators,
  ): Either<InvalidUserException, User> {
    const errors: TInvalidUserResponse = {
      fields: [],
    };
    const nameOrError = Name.create(user.name);
    const emailOrError = Email.create(user.email, externalValidators?.email);

    if (nameOrError.isLeft()) errors.fields.push(nameOrError.value);
    if (emailOrError.isLeft()) errors.fields.push(emailOrError.value);

    let projectKeyOrError:
      | Either<InvalidValueObjectException, ProjectKey>
      | undefined;
    const scopes: Scope[] = [];

    if (user.projectKey) {
      projectKeyOrError = ProjectKey.create(user.projectKey);

      if (projectKeyOrError.isLeft())
        errors.fields.push(projectKeyOrError.value);
    }

    if (user.scopes) {
      for (const scope of user.scopes) {
        const scopeOrError = Scope.create(scope);

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

  public async register(id: Id) {
    await DomainEvents.dispatch(new UserRegisteredEvent(
      id, 
      this.getName(),
      this.getEmail(),
      this.getProjectKey()));
  }
}
