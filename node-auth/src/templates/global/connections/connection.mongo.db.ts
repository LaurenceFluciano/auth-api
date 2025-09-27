import { IConnectionDatabase } from './connection.interface';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ConfigError } from 'src/templates/context/error/others/config.error';
dotenv.config();

export class MongooseConnectionDatabase implements IConnectionDatabase {
  private getConfig(): {
    uri: string;
  } {
    const { DB_CONN_STRING } = process.env;
    if (!DB_CONN_STRING)
      throw new ConfigError('Mongodb connection string is not defined.');
    return { uri: DB_CONN_STRING };
  }

  async connect(): Promise<void> {
    const config = this.getConfig();
    try {
      await mongoose.connect(config.uri);
      console.log('MongoDB connected');
    } catch (err) {
      throw new ConfigError(`Failed to connect to MongoDB: ${err}`);
    }
  }
  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}
