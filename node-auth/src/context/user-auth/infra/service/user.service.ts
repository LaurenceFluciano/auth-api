import { ResponseUserDto } from 'src/context/user-auth/application/dto/find.user.dto';
import {
  RegisterUserDto,
  TRegisterUserDto,
} from 'src/context/user-auth/application/dto/register.user.dto';
import { CreateUserUseCase } from 'src/context/user-auth/application/usecases/create.user.usecase';
import { FindUserUseCase } from 'src/context/user-auth/application/usecases/find.user.usecase';
import * as userRepository from 'src/context/user-auth/domain/ports/user.repository';
import { ApplicationException } from 'src/templates/context/error/application/application.error';
import { UseCaseException } from 'src/templates/context/error/application/usecase.error';
import { Either } from 'src/templates/context/error/others/either';
import { TOffsetPagination } from 'src/templates/global/types/base.pagination';
import { inject, injectable } from 'tsyringe';
import * as encryptPort from '../../domain/ports/encrypt.port';
import { RegisterPasswordAuthMethod } from '../../application/usecases/register.password.auth';

@injectable()
export class UserServiceFacade {
  private createUseCase: CreateUserUseCase;
  private findUseCase: FindUserUseCase;
  private registerPasswordAuthMethod: RegisterPasswordAuthMethod;

  constructor(
    @inject('IUserRepository') private repo: userRepository.IUserRepository,
    @inject('IEncryptStrategy')
    private encryptService: encryptPort.IEncryptStrategy,
  ) {
    this.createUseCase = new CreateUserUseCase(this.repo);
    this.findUseCase = new FindUserUseCase(this.repo);
    this.registerPasswordAuthMethod = new RegisterPasswordAuthMethod(
      this.repo,
      this.encryptService,
    );
  }

  public async create(
    dto: TRegisterUserDto,
  ): Promise<Either<ApplicationException, Id>> {
    const userDtoOrError = RegisterUserDto.create(dto);
    if (userDtoOrError.isLeft()) return userDtoOrError;
    return this.createUseCase.execute(userDtoOrError.value);
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

  async registerPasswordAuth(
    userId: Id,
    password: string,
  ): Promise<Either<UseCaseException, null>> {
    return await this.registerPasswordAuthMethod.register(userId, {
      password: password,
    });
  }
}
