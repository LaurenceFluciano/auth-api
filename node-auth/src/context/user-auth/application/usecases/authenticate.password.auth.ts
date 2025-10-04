import { ApplicationException } from 'src/templates/context/error/application/application.error';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { IAuthFactors } from '../../domain/ports/auth.factors.port';
import { IEncryptStrategy } from '../../domain/ports/encrypt.port';
import { IUserRepository } from '../../domain/ports/user.repository';
import { NotFoundUserUseCaseError } from '../errors/notfound.user.error';
import { User } from '../../domain/entities/user';
import {
  InternalServerErrorUseCaseException,
  UnprocessableEntityUseCaseException,
} from 'src/templates/context/error/application/usecase.error';
import { AuthMethodNotDefinedException } from '../errors/auth.error';

export class AuthPasswordAuthMethod
  implements
    IAuthFactors<
      {
        email: string;
        projectKey: string;
        password: string;
      },
      null
    >
{
  constructor(
    private repo: IUserRepository,
    private encrypt: IEncryptStrategy,
  ) {}

  async authenticate(credentials: {
    email: string;
    projectKey: string;
    password: string;
  }): Promise<Either<ApplicationException, null>> {
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

    const method = user.getAuth('password');

    if (!method)
      Left.create(
        new AuthMethodNotDefinedException('Password auth method not defined.'),
      );

    const result = await this.encrypt.verifyHash(
      credentials.password,
      method!.secret,
    );

    if (result.isLeft())
      return Left.create(
        new InternalServerErrorUseCaseException('Internal Server error'),
      );

    return Right.create(null);
  }
}
