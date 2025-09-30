import { UseCaseException } from 'src/templates/context/error/application/usecase.error';
import { IRegisterUserDto, IUserDto } from '../dtos/external.user.dto';
import { Either } from 'src/templates/context/error/others/either';

export interface IUserServicePort {
  createUser(dto: IRegisterUserDto): Promise<Either<UseCaseException, Id>>;
  findByEmailAndProject(
    email: string,
    projectKey: string,
  ): Promise<Either<UseCaseException, IUserDto>>;
}
