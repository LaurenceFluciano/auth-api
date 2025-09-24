import { FakeConnectionDatabase } from '../connections/connection.fake.db';
import { IConnectionDatabase } from '../connections/connection.interface';
import { TDatabases } from './config.type';

const databases: Record<TDatabases, new () => IConnectionDatabase> = {
  fake: FakeConnectionDatabase,
};

export const factoryConnectionDatabase = (
  database: TDatabases,
): IConnectionDatabase => {
  return new databases[database]();
};
