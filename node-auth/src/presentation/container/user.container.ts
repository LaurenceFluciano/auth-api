import { container } from 'tsyringe';
import { UserServiceFacade } from '../../context/user-auth/infra/service/user.service';
import { UserRepositoryFactory } from '../../templates/global/factories/director.factory';
import { UserController } from '../controllers/user.controller';
import { IUserRepository } from 'src/context/user-auth/domain/ports/user.repository';
import { IEncryptStrategy } from 'src/context/user-auth/application/ports/encrypt.port';
import { BcryptJsEncryptStrategy } from 'src/context/user-auth/infra/encrypt/bcryptjs';
import { UserAuthController } from '../controllers/auth.controller';

const userRepository = new UserRepositoryFactory().createRepository();
export const bcryptjsService = new BcryptJsEncryptStrategy();

container.register<IUserRepository>('IUserRepository', {
  useValue: userRepository,
});
container.register<IEncryptStrategy>('IEncryptStrategy', {
  useValue: bcryptjsService,
});
container.registerSingleton(UserServiceFacade);
container.registerSingleton(UserController);
container.registerSingleton(UserAuthController);

export const userController = container.resolve(UserController);
export const authController = container.resolve(UserAuthController);
