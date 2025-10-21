import 'reflect-metadata';
import express from 'express';
import { userRouter } from './presentation/routes/user.routes';
import { handlerError } from './presentation/errors/handler.errors';
import { authRouter } from './presentation/routes/auth.routes';
import { DatabaseConfig } from './templates/config/dabase.config';
import { MongooseConnectionDatabase } from './presentation/connections/connection.mongo.db';
import { StaticConfigEnv } from './templates/config/environment.config';
import { DotEnvEnvironmentConfig } from './templates/config/dotenv.env.config';
const app = express();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth/', authRouter);
app.use(handlerError);

StaticConfigEnv.initialize(new DotEnvEnvironmentConfig());

StaticConfigEnv.getEnvironmentConfig().setEnvironment('DB_CONN_STRING');
StaticConfigEnv.getEnvironmentConfig().setEnvironment('USER_COLLECTION_NAME');
StaticConfigEnv.getEnvironmentConfig().setEnvironment(
  'DATABASE_USER_REPOSITORY_ADAPTER',
);
StaticConfigEnv.getEnvironmentConfig().setEnvironment('ACCESS_TOKEN_EXPIRE_IN');
StaticConfigEnv.getEnvironmentConfig().setEnvironment(
  'REFRESH_TOKEN_EXPIRE_IN',
);
StaticConfigEnv.getEnvironmentConfig().setEnvironment('SECRET_KEY_JWT');
StaticConfigEnv.getEnvironmentConfig().setEnvironment('DOMAIN_EVENT_CONTEXT');

async function run() {
  DatabaseConfig.setDatabase('mongoose', MongooseConnectionDatabase);
  const db = DatabaseConfig.factoryConnectionDatabase('mongoose');
  await db.connect();
  app.listen(3000, () => {
    console.log('App is running in 3000 port.');
  });
}

void run();
