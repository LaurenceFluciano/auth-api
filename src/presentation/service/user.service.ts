import { ResponseUserDto } from 'src/context/user/application/dto/find.user.dto';
import { RegisterUserDto } from 'src/context/user/application/dto/register.user.dto';
import { CreateUserUseCase } from 'src/context/user/application/usecases/create.user.usecase';
import { FindUserUseCase } from 'src/context/user/application/usecases/find.user.usecase';
import * as userRepository from 'src/context/user/domain/ports/user.repository';
import { UseCaseException } from 'src/templates/context/error/application/usecase.error';
import { Either } from 'src/templates/context/error/others/either';
import { TOffsetPagination } from 'src/templates/global/types/base.pagination';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserServiceFacade {
  private createUseCase: CreateUserUseCase;
  private findUseCase: FindUserUseCase;

  constructor(
    @inject('IUserRepository') private repo: userRepository.IUserRepository,
  ) {
    this.createUseCase = new CreateUserUseCase(this.repo);
    this.findUseCase = new FindUserUseCase(this.repo);
  }

  public create(dto: RegisterUserDto): Promise<Either<UseCaseException, Id>> {
    return this.createUseCase.execute(dto);
  }

  async findAll(
    pagination: TOffsetPagination,
  ): Promise<Either<UseCaseException, ResponseUserDto[]>> {
    return this.findUseCase.findAll(pagination);
  }

  async findOneById(
    id: Id,
  ): Promise<Either<UseCaseException, ResponseUserDto>> {
    return this.findUseCase.findOneById(id);
  }

  async findByCredential(
    email: string,
    projectKey: string,
  ): Promise<Either<UseCaseException, ResponseUserDto>> {
    return this.findUseCase.findByCredential(email, projectKey);
  }
}
