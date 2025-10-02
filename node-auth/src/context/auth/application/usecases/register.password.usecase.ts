import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { IRegisterAuthFactors } from '../../domain/ports/auth.factors.port';
import { IAuthRepository } from '../../domain/ports/auth.repository';
import { TPasswordDto } from '../dto/password.dto';
import { Password } from '../../domain/values-objects/password.vo';
import { InvalidPasswordUseCaseError } from '../errors/invalid.password.error';
import {
  InternalServerErrorUseCaseException,
  UnprocessableEntityUseCaseException,
  UseCaseException,
} from 'src/templates/context/error/application/usecase.error';
import { IEncryptStrategy } from '../../domain/ports/encrypt.port';

export class RegisterPasswordFactorMethod
  implements IRegisterAuthFactors<TPasswordDto>
{
  constructor(
    private authRepository: IAuthRepository,
    private encryptService: IEncryptStrategy,
  ) {}

  async register(
    userId: Id,
    auth: TPasswordDto,
  ): Promise<Either<UseCaseException, null>> {
    const passwordOrError = Password.create(auth.password);

    if (passwordOrError.isLeft())
      return Left.create(
        new InvalidPasswordUseCaseError(passwordOrError.value),
      );

    const cryptoPasswordOrError = await this.encryptService.hash(
      passwordOrError.value.password,
    );

    if (cryptoPasswordOrError.isLeft())
      return Left.create(
        new InternalServerErrorUseCaseException('Internal Server Error.'),
      );

    const id = await this.authRepository.setFactorMethod(userId, 'knowledge', {
      type: 'password',
      secret: cryptoPasswordOrError.value,
    });

    if (!id)
      return Left.create(
        new UnprocessableEntityUseCaseException('Auth cannot be defined.'),
      );

    return Right.create(null);
  }
}
