// Values Objects
import { Email } from '../values-objects/email.vo';
import { Name } from '../values-objects/name.vo';
import { Scope } from '../values-objects/scope.vo';

// Types
import { TUserEntity, TUserValidators } from './type.user';

// Exceptions
import {
  InvalidUserException,
  TInvalidUserResponse,
} from '../errors/user.error';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { DomainEvents } from 'src/templates/context/events/domain.events';
import { UserRegisteredEvent } from '../events/user.registered.event';

export class User {
  private constructor(
    private name: Name,
    private email: Email,
    private scopes?: Scope[],
  ) {}

  public static create(
    user: TUserEntity,
    externalValidators?: TUserValidators,
  ): Either<InvalidUserException, User> {
    const errors: TInvalidUserResponse = {
      fields: [],
    };
    const nameOrError = Name.create(user.name);
    const emailOrError = Email.create(user.email, externalValidators?.email);

    if (nameOrError.isLeft()) errors.fields.push(nameOrError.value);
    if (emailOrError.isLeft()) errors.fields.push(emailOrError.value);

    const scopes: Scope[] = [];

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
      new User(nameOrError.value as Name, emailOrError.value as Email, scopes),
    );
  }

  public getName(): string {
    return this.name.getValue();
  }

  public getEmail(): string {
    return this.email.getValue();
  }

  public getScopes(): string[] | undefined {
    return this.scopes?.map((scope) => scope.getValue());
  }

  public async register(id: Id, projectKey: string) {
    await DomainEvents.dispatch(
      new UserRegisteredEvent(id, this.getName(), this.getEmail(), projectKey),
    );
  }
}
