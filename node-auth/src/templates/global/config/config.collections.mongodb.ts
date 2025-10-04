import dotenv from 'dotenv';
import { ConfigError } from 'src/templates/context/error/others/config.error';
dotenv.config();

const { USER_COLLECTION_NAME } = process.env;

if (!USER_COLLECTION_NAME) throw new ConfigError('Collection is not defined');

export const collections: Record<string, string> = {
  user: USER_COLLECTION_NAME,
};
