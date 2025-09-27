import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './presentation/routes/user.routes';
import { factoryConnectionDatabase } from './templates/global/config/config.main';
import { NotDefinedFieldDtoException } from './templates/context/error/application/invalid.dto.error';
import { ApplicationException } from './templates/context/error/application/application.error';
import { DomainException } from './templates/context/error/domain/domain.error';
const app = express();

app.use(express.json());
app.use('/api/v1/users', userRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof NotDefinedFieldDtoException) {
    return res
      .status(500)
      .send('NotDefinedFieldDtoException deve ser implementado!');
  }

  if (err instanceof ApplicationException) {
    return res.status(500).send('ApplicationException deve ser implementado!');
  }

  if (err instanceof DomainException) {
    return res.status(500).send('DomainException deve ser implementado!');
  }

  if (err instanceof Error) {
    console.error(err.stack);
  } else {
    console.error(err);
  }

  return res.status(500).send('Ocorreu um erro no servidor!');
});

async function run() {
  const db = factoryConnectionDatabase('mongoose');
  await db.connect();
  app.listen(3000, () => {
    console.log('App is running in 3000 port.');
  });
}

void run();
