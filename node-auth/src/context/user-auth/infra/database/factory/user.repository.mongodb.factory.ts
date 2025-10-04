import { IUserRepository } from 'src/context/user-auth/domain/ports/user.repository';
import { IUserRepositoryFactory } from '../../../domain/ports/user.repository.factory';
import { UserRepositoryMongo } from 'src/context/user-auth/infra/database/repositories/user.repository';

export class UserRepositoryFactoryMongodb implements IUserRepositoryFactory {
  createRepository(): IUserRepository {
    return new UserRepositoryMongo();
  }
}
