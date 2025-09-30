import { TDatabases } from 'src/templates/global/config/config.type';
import { IUserRepositoryFactory } from '../../../context/user/infra/database/factory/user.repository.factory';
import { IUserRepository } from 'src/context/user/domain/ports/user.repository';
import { UserRepositoryFactoryMongodb } from '../../../context/user/infra/database/factory/user.repository.mongodb.factory';

const DATABASE_USER_REPOSITORY_ADAPTER = 'mongoose';

type TDatabaseOmitted = Exclude<TDatabases, 'fake'>;

const factories: Record<TDatabaseOmitted, IUserRepositoryFactory> = {
  mongoose: new UserRepositoryFactoryMongodb(),
};

export class UserRepositoryFactory implements IUserRepositoryFactory {
  createRepository(): IUserRepository {
    return factories[DATABASE_USER_REPOSITORY_ADAPTER].createRepository();
  }
}
