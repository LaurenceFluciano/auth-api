import 'reflect-metadata';
import express from 'express';
import { userRouter } from './presentation/routes/user.routes';
import { factoryConnectionDatabase } from './templates/global/config/config.main';
import { handlerError } from './presentation/errors/handler.errors';
const app = express();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use(handlerError);

async function run() {
  const db = factoryConnectionDatabase('mongoose');
  await db.connect();
  app.listen(3000, () => {
    console.log('App is running in 3000 port.');
  });
}

void run();
