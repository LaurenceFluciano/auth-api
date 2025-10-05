import { ApplicationException } from 'src/templates/context/error/application/application.error';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { IUserRepository } from '../../domain/ports/user.repository';
import { NotFoundUserUseCaseError } from '../errors/notfound.user.error';
import { User } from '../../domain/entities/user';
import {
  InternalServerErrorUseCaseException,
  UnprocessableEntityUseCaseException,
  UseCaseException,
} from 'src/templates/context/error/application/usecase.error';
import { IAuthFactory } from '../factories/auth.method.factory';
import { TUserAuthenticate } from '../dto/auth.dto';
import { UserPersistence } from '../../domain/entities/type.user';

export class UserAuthUseCase {
  constructor(
    private repo: IUserRepository,
    private authFactory: IAuthFactory,
  ) {}

  async authenticate(
    credentials: TUserAuthenticate,
  ): Promise<Either<UseCaseException, UserPersistence>> {
    const userPersistence = await this.repo.findByCredential(
      credentials.email,
      credentials.projectKey,
    );

    if (!userPersistence) return Left.create(new NotFoundUserUseCaseError());

    const user = User.fromPersistence(userPersistence);

    if (!user)
      return Left.create(
        new UnprocessableEntityUseCaseException('Not valid User Entity.'),
      );

    const authMethod = this.authFactory.createAuthMethod();
    const authOrError = await authMethod.authentificate(
      user,
      credentials.authCredentials,
    );

    if (authOrError.isLeft()) return authOrError;

    return Right.create(user.toPersistence());
  }

  async register(
    userId: Id,
    auth: object,
  ): Promise<Either<ApplicationException, null>> {
    const persistence = await this.repo.findById(userId);
    if (!persistence) return Left.create(new NotFoundUserUseCaseError());
    const user = User.fromPersistence(persistence);
    if (!user)
      return Left.create(
        new UnprocessableEntityUseCaseException('Not valid User Entity.'),
      );
    const authMethodOrError = await this.authFactory.createAuthFactor(auth);
    if (authMethodOrError.isLeft()) return authMethodOrError;
    user.addAuthMethod(authMethodOrError.value);
    const result = await this.repo.saveChanges(user.id, user.toPersistence());
    if (!result)
      return Left.create(
        new InternalServerErrorUseCaseException('Internal server error.'),
      );
    return Right.create(null);
  }
}
