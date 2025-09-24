import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { UseCaseException } from 'src/templates/context/error/application/usecase.error';
import { TUserValidators } from 'src/context/user/domain/entities/type.user';
import { User } from 'src/context/user/domain/entities/user';
import { IUserRepository } from 'src/context/user/domain/ports/user.repository';
import { InvalidUserUseCaseError } from '../errors/invalid.user.error';
import { RegisterUserDto } from '../dto/register.user.dto';
import { AlreadyExistsUserUseCaseError } from '../errors/exist.user.error';

export class CreateUserUseCase {
  constructor(
    private repo: IUserRepository,
    private validator: TUserValidators,
  ) {}

  public async execute(
    /**
     * projectKey must be validated in an external layer.
     * The User use case does not need to know whether the projectKey is valid or not.
     * This is the responsibility of another bounded context.
     */
    dto: RegisterUserDto,
  ): Promise<Either<UseCaseException, Id>> {
    const { name, email } = dto;
    const userOrError = User.create({ name, email }, this.validator);

    if (userOrError.isLeft())
      return Left.create(new InvalidUserUseCaseError(userOrError.value));

    const userExist = await this.repo.findByCredential(
      dto.email,
      dto.projectKey,
    );

    if (userExist) return Left.create(new AlreadyExistsUserUseCaseError());

    const id = await this.repo.add(dto);

    if (!id)
      return Left.create(
        new UseCaseException('Ocorreu um erro ao criar o usuário!'),
      );

    await userOrError.value.register(id, dto.projectKey);

    return Right.create(id);
  }
}
