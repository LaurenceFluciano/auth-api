import { IUserRepository } from 'src/context/user/domain/ports/user.repository';
import { IUserRepositoryFactory } from './user.repository.factory';
import { UserRepositoryMongo } from 'src/context/user/infra/database/repositories/user.repository';

export class UserRepositoryFactoryMongodb implements IUserRepositoryFactory {
  createRepository(): IUserRepository {
    return new UserRepositoryMongo();
  }
}
