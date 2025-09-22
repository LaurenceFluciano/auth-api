import { Either, Left, Right } from 'src/error/either';
import { UseCaseException } from 'src/error/usecase.error';
import { TUserValidators } from 'src/user/domain/entities/type.user';
import { User } from 'src/user/domain/entities/user';
import { IUserRepository } from 'src/user/domain/ports/user.repository';
import { InvalidUserUseCaseError } from '../errors/invalid.user.error';
import { RegisterUserDto } from '../dto/register.user.dto';
import { AlreadyExistsUserUseCaseError } from '../errors/exist.user.error';
import { IEventBus } from 'src/base/events/event.interface';
import { UserRegisteredEvent } from '../events/registered.user.event';

export class CreateUserUseCase {
  constructor(
    private repo: IUserRepository,
    private validator: TUserValidators,
    private eventBus: IEventBus,
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

    const id = await this.repo.add(dto);

    if (!id)
      return Left.create(
        new UseCaseException('Ocorreu um erro ao criar o usuário!'),
      );

    const event = UserRegisteredEvent.forProject(
      dto.projectKey,
      id,
      dto.name,
      dto.email,
    );
    await this.eventBus.publish(event);

    return Right.create(id);
  }
}
