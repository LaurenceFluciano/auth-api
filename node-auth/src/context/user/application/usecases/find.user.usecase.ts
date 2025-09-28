import { TOffsetPagination } from 'src/templates/global/types/base.pagination';
import { IUserRepository } from '../../domain/ports/user.repository';
import { ResponseUserDto } from '../dto/find.user.dto';
import { UserIdNotDefinedUseCaseError } from '../errors/without.id.user.error';
import { Either, Left, Right } from 'src/templates/context/error/others/either';
import { NotFoundUserUseCaseError } from '../errors/notfound.user.error';
import { TUserDto } from '../../domain/entities/type.user';
import { UseCaseException } from 'src/templates/context/error/application/usecase.error';

export class FindUserUseCase {
  constructor(private readonly repo: IUserRepository) {}

  private mapperToResponse(user: TUserDto): ResponseUserDto {
    return new ResponseUserDto(
      user.email,
      user.name,
      user.projectKey || '',
      user.scopes || [],
      user.id!,
    );
  }

  async findAll(
    pagination: TOffsetPagination,
  ): Promise<Either<UseCaseException, ResponseUserDto[]>> {
    const users = await this.repo.findAll(pagination);
    const invalidUsers = users.filter((u) => u.id === undefined);
    if (invalidUsers.length > 0) {
      return Left.create(new UserIdNotDefinedUseCaseError());
    }
    const response = users.map((user) => this.mapperToResponse(user));
    return Right.create(response);
  }

  async findOneById(
    id: Id,
  ): Promise<Either<UseCaseException, ResponseUserDto>> {
    const user = await this.repo.findById(id);
    if (!user) return Left.create(new NotFoundUserUseCaseError());
    return Right.create(this.mapperToResponse(user));
  }

  async findByCredential(
    email: string,
    projectKey: string,
  ): Promise<Either<UseCaseException, ResponseUserDto>> {
    const user = await this.repo.findByCredential(email, projectKey);
    if (!user) return Left.create(new NotFoundUserUseCaseError());
    return Right.create(this.mapperToResponse(user));
  }
}
