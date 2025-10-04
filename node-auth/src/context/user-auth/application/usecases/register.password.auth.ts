import { IRegisterAuthFactors } from 'src/context/user-auth/domain/ports/auth.factors.port';
import { ApplicationException } from 'src/templates/context/error/application/application.error';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { IUserRepository } from '../../domain/ports/user.repository';
import { User } from '../../domain/entities/user';
import { NotFoundUserUseCaseError } from '../errors/notfound.user.error';
import { Password } from '../../domain/values-objects/password.vo';
import { InvalidPasswordUseCaseError } from '../errors/invalid.password.error';
import { IEncryptStrategy } from '../../domain/ports/encrypt.port';
import {
  InternalServerErrorUseCaseException,
  UnprocessableEntityUseCaseException,
} from 'src/templates/context/error/application/usecase.error';

export class RegisterPasswordAuthMethod
  implements
    IRegisterAuthFactors<{
      password: string;
    }>
{
  constructor(
    private repo: IUserRepository,
    private encrypt: IEncryptStrategy,
  ) {}

  async register(
    userId: Id,
    auth: { password: string },
  ): Promise<Either<ApplicationException, null>> {
    const persistence = await this.repo.findById(userId);
    if (!persistence) return Left.create(new NotFoundUserUseCaseError());
    const user = User.fromPersistence(persistence);
    if (!user)
      return Left.create(
        new UnprocessableEntityUseCaseException('Not valid User Entity.'),
      );
    const passwordOrError = Password.create(auth.password);
    if (passwordOrError.isLeft())
      return Left.create(
        new InvalidPasswordUseCaseError(passwordOrError.value),
      );
    const hashedPassword = await this.encrypt.hash(
      passwordOrError.value.getValue(),
    );
    if (hashedPassword.isLeft())
      return Left.create(
        new InternalServerErrorUseCaseException('Internal server error.'),
      );
    user.addAuthMethod('password', { secret: hashedPassword.value });
    const result = await this.repo.saveChanges(user.id, user.toPersistence());
    if (!result)
      return Left.create(
        new InternalServerErrorUseCaseException('Internal server error.'),
      );
    return Right.create(null);
  }
}
