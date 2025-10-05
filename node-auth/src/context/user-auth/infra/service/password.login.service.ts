import { TPasswordLogin } from '../../application/dto/auth.dto';
import { ILogin } from '../../application/ports/login.port';
import { UserAuthUseCase } from '../../application/usecases/user.auth.usecase';
import { JwtTokenResponse } from '../port/jwt.port';
import { injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UseCaseException } from 'src/templates/context/error/application/usecase.error';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { ConfigError } from 'src/templates/context/error/others/config.error';

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

    const { ACCESS_TOKEN_EXPIRE_IN, REFRESH_TOKEN_EXPIRE_IN, SECRET_KEY_JWT } =
      process.env;

    if (!ACCESS_TOKEN_EXPIRE_IN || !REFRESH_TOKEN_EXPIRE_IN || !SECRET_KEY_JWT)
      return Left.create(new ConfigError('JWT envioroment vars not defined.'));

    const accessToken = jwt.sign(
      {
        sup: userOrError.value.id,
        email: userOrError.value.email,
        name: userOrError.value.name,
      },
      SECRET_KEY_JWT,
      { expiresIn: Number(ACCESS_TOKEN_EXPIRE_IN) },
    );

    const refreshToken = jwt.sign(
      {
        sup: userOrError.value.id,
      },
      SECRET_KEY_JWT,
      { expiresIn: Number(REFRESH_TOKEN_EXPIRE_IN) },
    );

    return Right.create({
      accessToken,
      refreshToken,
    });
  }
}
