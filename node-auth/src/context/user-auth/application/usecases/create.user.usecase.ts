import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { TUserValidators } from 'src/context/user-auth/domain/entities/type.user';
import { User } from 'src/context/user-auth/domain/entities/user';
import { IUserRepository } from 'src/context/user-auth/domain/ports/user.repository';
import { InvalidUserUseCaseError } from '../errors/invalid.user.error';
import { RegisterUserDto } from '../dto/register.user.dto';
import { AlreadyExistsUserUseCaseError } from '../errors/exist.user.error';
import { UseCaseException } from 'src/templates/context/error/application/usecase.error';

export class CreateUserUseCase {
  constructor(
    private repo: IUserRepository,
    private validator?: TUserValidators,
  ) {}

  public async execute(
    dto: RegisterUserDto,
  ): Promise<Either<UseCaseException, Id>> {
    const userOrError = User.create(dto, this.validator);

    if (userOrError.isLeft())
      return Left.create(new InvalidUserUseCaseError(userOrError.value));

    const userExist = await this.repo.findByCredential(
      dto.email,
      dto.projectKey,
    );

    if (userExist) return Left.create(new AlreadyExistsUserUseCaseError());

    const id = await this.repo.add(userOrError.value);

    if (!id)
      return Left.create(
        new UseCaseException('Ocorreu um erro ao criar o usuário!'),
      );

    await userOrError.value.register(dto.projectKey);

    return Right.create(id);
  }
}
