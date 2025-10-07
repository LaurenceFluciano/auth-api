import { IUserRepository } from 'src/context/user-auth/domain/ports/user.repository';
import { ConfigError } from 'src/templates/context/error/others/config.error';
import { IUserRepositoryFactory } from 'src/context/user-auth/domain/ports/user.repository.factory';
import { StaticConfigEnv } from '../config/environment.config';

export class UserRepositoryFactory
  extends StaticConfigEnv
  implements IUserRepositoryFactory
{
  private static repositories: Record<string, IUserRepositoryFactory> = {};

  public static setDatabase(key: string, value: IUserRepositoryFactory) {
    UserRepositoryFactory.repositories[key] = value;
  }

  public static createRepository(): IUserRepository {
    const db = this.getEnvironmentConfig().getEnv(
      'DATABASE_USER_REPOSITORY_ADAPTER',
    );

    if (!(db in UserRepositoryFactory.repositories))
      throw new ConfigError('Adapter not able, please add.');

    return UserRepositoryFactory.repositories[db].createRepository();
  }
}
