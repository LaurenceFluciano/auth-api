import { IConnectionDatabase } from '../../templates/connections/connection.interface';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ConfigError } from 'src/templates/context/error/others/config.error';
import { StaticConfigEnv } from '../../templates/config/environment.config';
dotenv.config();

export class MongooseConnectionDatabase
  extends StaticConfigEnv
  implements IConnectionDatabase
{
  private getConfig(): {
    uri: string;
  } {
    const uri =
      MongooseConnectionDatabase.getEnvironmentConfig().getEnv(
        'DB_CONN_STRING',
      );
    return { uri };
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
