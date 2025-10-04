import { IUserRepositoryFactory } from '../../../context/user-auth/domain/ports/user.repository.factory';
import { IUserRepository } from 'src/context/user-auth/domain/ports/user.repository';
import { UserRepositoryFactoryMongodb } from '../../../context/user-auth/infra/database/factory/user.repository.mongodb.factory';
import dotenv from 'dotenv';
import { ConfigError } from 'src/templates/context/error/others/config.error';
dotenv.config();

const { DATABASE_USER_REPOSITORY_ADAPTER } = process.env;

const factories: Record<string, IUserRepositoryFactory> = {
  mongoose: new UserRepositoryFactoryMongodb(),
};

export class UserRepositoryFactory implements IUserRepositoryFactory {
  createRepository(): IUserRepository {
    if (!DATABASE_USER_REPOSITORY_ADAPTER)
      throw new ConfigError('DATABASE USER REPOSITORY ADAPTER NOT DEFINED.');

    const adapter = Object.keys(factories).find(
      (factory) => factory === DATABASE_USER_REPOSITORY_ADAPTER,
    );

    if (!adapter) throw new ConfigError('ADAPTER NOT AVALIABLE.');

    return factories[adapter].createRepository();
  }
}
