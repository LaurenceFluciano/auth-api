import express from 'express';
const userRouter = express.Router();
import { asyncRoute } from '../middlewares/async.handler.middleware';
import { userController } from '../../context/user/infra/container/user.container';
import { projectKeyMiddleware } from '../middlewares/projectkey.middleware';
import { paginationMiddleware } from '../middlewares/pagination.middleware.control';

userRouter
  .route('/credentials')
  .get(projectKeyMiddleware, asyncRoute(userController.getUserByCredential));

userRouter.route('/:id').get(asyncRoute(userController.getById));

userRouter
  .route('/')
  .get(paginationMiddleware, asyncRoute(userController.getUsers))
  .post(projectKeyMiddleware, asyncRoute(userController.register));

export { userRouter };
