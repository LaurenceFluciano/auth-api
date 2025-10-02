import { ApplicationException } from 'src/templates/context/error/application/application.error';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { IAuthFactors } from '../../domain/ports/auth.factors.port';
import { IAuthRepository } from '../../domain/ports/auth.repository';
import { IEncryptStrategy } from '../../domain/ports/encrypt.port';
import { TCredentialsWithPasswordDto } from '../dto/password.dto';
import { AuthMethodNotDefinedException } from '../errors/auth.error';
import { InternalServerErrorUseCaseException } from 'src/templates/context/error/application/usecase.error';

export class AuthPasswordFactorMethod
  implements IAuthFactors<TCredentialsWithPasswordDto, boolean>
{
  constructor(
    private authRepository: IAuthRepository,
    private encryptService: IEncryptStrategy,
  ) {}

  async authenticate(
    credentials: TCredentialsWithPasswordDto,
  ): Promise<Either<ApplicationException, boolean>> {
    const factor = await this.authRepository.getFactorMethod(
      credentials.userId,
      'knowledge',
      'password',
    );

    if (!factor)
      return Left.create(
        new AuthMethodNotDefinedException(
          'Password auth method not registered.',
        ),
      );

    const verifyOrError = await this.encryptService.verifyHash(
      credentials.password,
      factor?.secret,
    );

    if (verifyOrError.isLeft())
      return Left.create(
        new InternalServerErrorUseCaseException('Internal server error.'),
      );

    return Right.create(true);
  }
}
