import { TPasswordLogin } from '../../application/dto/user.auth.dto';
import { ILogin } from '../../../auth/application/ports/login.port';
import { UserAuthUseCase } from '../../application/usecases/user.auth.usecase';
import { JwtTokenResponse } from '../../../auth/infra/port/jwt.port';
import { injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UseCaseException } from 'src/templates/context/error/application/usecase.error';
import { Either, Right } from 'src/templates/context/error/others/either';
import { StaticConfigEnv } from 'src/templates/config/environment.config';

dotenv.config();

@injectable()
export class UserLoginPasswordStatelessService
  implements ILogin<TPasswordLogin, JwtTokenResponse>
{
  constructor(private usecaseAuth: UserAuthUseCase) {}

  async login(
    dto: TPasswordLogin,
  ): Promise<Either<UseCaseException, JwtTokenResponse>> {
    const credentials = {
      email: dto.email,
      projectKey: dto.projectKey,
      authCredentials: {
        secret: dto.secret,
      },
    };
    const userOrError = await this.usecaseAuth.authenticate(credentials);
    if (userOrError.isLeft()) return userOrError;

    const [ACCESS, REFRESH, SECRET] =
      StaticConfigEnv.getEnvironmentConfig().getManyEnv(
        'ACCESS_TOKEN_EXPIRE_IN',
        'REFRESH_TOKEN_EXPIRE_IN',
        'SECRET_KEY_JWT',
      );

    const accessToken = jwt.sign(
      {
        sup: userOrError.value.id,
        email: userOrError.value.email,
        name: userOrError.value.name,
      },
      SECRET,
      { expiresIn: Number(ACCESS) },
    );

    const refreshToken = jwt.sign(
      {
        sup: userOrError.value.id,
      },
      SECRET,
      { expiresIn: Number(REFRESH) },
    );

    return Right.create({
      accessToken,
      refreshToken,
    });
  }
}
