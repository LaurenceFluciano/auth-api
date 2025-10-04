import { IConnectionDatabase } from '../connections/connection.interface';
import { MongooseConnectionDatabase } from '../connections/connection.mongo.db';

const databases: Record<string, new () => IConnectionDatabase> = {
  mongoose: MongooseConnectionDatabase,
};

export const factoryConnectionDatabase = (
  database: string,
): IConnectionDatabase => {
  return new databases[database]();
};
