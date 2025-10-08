import { ConfigError } from 'src/templates/context/error/others/config.error';
import { IRepositoryFactory } from './repository.factory';

export class RepositoryFactoryManager {
  private static repositories: Record<
    string,
    new () => IRepositoryFactory<unknown>
  > = {};

  public static setDatabase<IRepository>(
    key: string,
    value: new () => IRepositoryFactory<IRepository>,
  ) {
    RepositoryFactoryManager.repositories[key] = value;
  }

  private static isRepositoryFactory(
    obj: unknown,
  ): obj is IRepositoryFactory<unknown> {
    return (
      !!obj &&
      typeof (obj as IRepositoryFactory<unknown>).createRepository ===
        'function'
    );
  }

  public static createRepository<IRepository>(repository: string): IRepository {
    const repositoryFactory = new RepositoryFactoryManager.repositories[
      repository
    ]();
    if (
      !repositoryFactory ||
      !RepositoryFactoryManager.isRepositoryFactory(repositoryFactory)
    )
      throw new ConfigError('Adapter not able, please add.');
    return repositoryFactory.createRepository() as IRepository;
  }
}
