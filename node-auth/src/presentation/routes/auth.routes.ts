import express from 'express';
const authRouter = express.Router();
import { asyncRoute } from '../middlewares/async.handler.middleware';
import { authController } from '../container/user.container';
import { projectKeyMiddleware } from '../middlewares/projectkey.middleware';
import { authFactorMiddleware } from '../middlewares/auth.context.middleware';

authRouter
  .route('/login')
  .post(
    authFactorMiddleware,
    projectKeyMiddleware,
    asyncRoute(authController.login),
  );

export { authRouter };
