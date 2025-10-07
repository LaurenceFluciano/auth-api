import { ConfigError } from 'src/templates/context/error/others/config.error';
import { IConnectionDatabase } from '../connections/connection.interface';
import { MongooseConnectionDatabase } from '../../presentation/connections/connection.mongo.db';

export class DatabaseConfig {
  private static databases: Record<string, new () => IConnectionDatabase> = {};

  public static setDatabase(key: string, value: new () => IConnectionDatabase) {
    DatabaseConfig.databases[key] = value;
  }

  public static factoryConnectionDatabase(
    database: string,
  ): IConnectionDatabase {
    if (!(database in DatabaseConfig.databases))
      throw new ConfigError('This database is not defined!');

    return new DatabaseConfig.databases[database]();
  }
}

DatabaseConfig.setDatabase('mongoose', MongooseConnectionDatabase);
