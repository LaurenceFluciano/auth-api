import { FakeConnectionDatabase } from '../connections/connection.fake.db';
import { IConnectionDatabase } from '../connections/connection.interface';
import { MongooseConnectionDatabase } from '../connections/connection.mongo.db';
import { TDatabases } from './config.type';

const databases: Record<TDatabases, new () => IConnectionDatabase> = {
  fake: FakeConnectionDatabase,
  mongoose: MongooseConnectionDatabase,
};

export const factoryConnectionDatabase = (
  database: TDatabases,
): IConnectionDatabase => {
  return new databases[database]();
};
