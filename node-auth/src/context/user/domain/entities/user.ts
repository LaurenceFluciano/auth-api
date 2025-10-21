// Values Objects
import { Email } from '../values-objects/email.vo';
import { Name } from '../values-objects/name.vo';
import { Scope } from '../values-objects/scope.vo';

// Types
import { TUserValidators, UserPersistence } from './type.user';

// Exceptions
import { InvalidUserException } from '../errors/user.error';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { DomainEvents } from 'src/templates/context/events/domain.events';
import { UserRegisteredEvent } from '../events/user.registered.event';
import { Entity } from 'src/templates/context/domain/entity';
import { UserId } from './user.id';
import { InvalidValueObjectException } from 'src/templates/context/error/domain/value-object.error';
import { Auth } from 'src/context/auth/domain/entities/auth';

export class User extends Entity {
  private constructor(
    public readonly id: Id,
    private name: Name,
    private email: Email,
    public auths: Auth,
    private scopes?: Scope[],
    public readonly projectKey?: string,
  ) {
    super(id);
  }

  public static create(
    user: UserPersistence,
    externalValidators?: TUserValidators,
  ): Either<InvalidUserException, User> {
    const errors: InvalidValueObjectException[] = [];

    const nameOrError = Name.create(user.name);
    const emailOrError = Email.create(user.email, externalValidators?.email);

    if (nameOrError.isLeft()) errors.push(nameOrError.value);
    if (emailOrError.isLeft()) errors.push(emailOrError.value);

    const scopes: Scope[] = [];

    if (user.scopes) {
      for (const scope of user.scopes) {
        const scopeOrError = Scope.create(scope);

        if (scopeOrError.isLeft()) {
          errors.push(scopeOrError.value);
          break;
        }

        scopes.push(scopeOrError.value);
      }
    }

    if (errors.length > 0) return Left.create(new InvalidUserException(errors));

    return Right.create(
      new User(
        new UserId().generateId(),
        nameOrError.value as Name,
        emailOrError.value as Email,
        new Auth(user.auths),
        scopes,
        user.projectKey,
      ),
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

  public async register(projectKey: string) {
    await DomainEvents.dispatch(
      new UserRegisteredEvent(
        this.id,
        this.getName(),
        this.getEmail(),
        projectKey,
      ),
    );
  }

  static fromPersistence(user: UserPersistence): User | null {
    if (user.id === undefined) return null;
    return new User(
      user.id,
      Name.fromPersistence(user.name),
      Email.fromPersistence(user.email),
      new Auth(user.auths),
      user.scopes?.map((scope) => Scope.fromPersistence(scope)),
      user.projectKey,
    );
  }

  public toPersistence(): UserPersistence {
    return {
      id: this.id,
      email: this.getEmail(),
      name: this.getName(),
      scopes: this.getScopes(),
      auths: this.auths.getInternalField(),
      projectKey: this.projectKey ?? 'DEFAULT',
    } as UserPersistence;
  }
}
