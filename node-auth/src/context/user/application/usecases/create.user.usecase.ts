import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { TUserValidators } from 'src/context/user/domain/entities/type.user';
import { User } from 'src/context/user/domain/entities/user';
import { IUserRepository } from 'src/context/user/domain/ports/user.repository';
import { InvalidUserUseCaseError } from '../errors/invalid.user.error';
import { RegisterUserDto } from '../dto/register.user.dto';
import { AlreadyExistsUserUseCaseError } from '../errors/exist.user.error';
import { UseCaseException } from 'src/templates/context/error/application/usecase.error';
import { IAuthFactory } from '../../../auth/application/factories/auth.method.factory';
import { TAuths } from '../../../auth/domain/entities/types.auth';

export class CreateUserUseCase {
  constructor(
    private repo: IUserRepository,
    private validator?: TUserValidators,
  ) {}

  public async execute(
    dto: RegisterUserDto,
    authFactory?: IAuthFactory,
  ): Promise<Either<UseCaseException, Id>> {
    const userExist = await this.repo.findByCredential(
      dto.email,
      dto.projectKey,
    );

    if (userExist) return Left.create(new AlreadyExistsUserUseCaseError());

    let auth: TAuths = {};
    if (dto.authField && authFactory) {
      const authOrError = await Promise.resolve(
        authFactory.createAuthFactor(dto.authField),
      );
      if (authOrError.isLeft()) return authOrError;
      auth = authOrError.value;
    }

    const userOrError = User.create({ ...dto, auths: auth }, this.validator);

    if (userOrError.isLeft())
      return Left.create(new InvalidUserUseCaseError(userOrError.value));

    const id = await this.repo.add(userOrError.value);

    if (!id)
      return Left.create(
        new UseCaseException('Ocorreu um erro ao criar o usuário!'),
      );

    await userOrError.value.register(dto.projectKey);

    return Right.create(id);
  }
}
