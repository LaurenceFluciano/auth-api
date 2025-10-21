import { container } from 'tsyringe';
import { UserServiceFacade } from '../../context/user/infra/service/user.service';
import { RepositoryFactoryManager } from 'src/templates/factories/repository.factory.director';
import { UserController } from '../controllers/user.controller';
import { IUserRepository } from 'src/context/user/domain/ports/user.repository';
import { IEncryptStrategy } from 'src/context/auth/application/ports/encrypt.port';
import { BcryptJsEncryptStrategy } from 'src/context/auth/infra/service/bcryptjs';
import { UserAuthController } from '../controllers/auth.controller';
import { UserRepositoryFactoryMongodb } from 'src/context/user/infra/database/factory/user.repository.mongodb.factory';

RepositoryFactoryManager.setDatabase('user', UserRepositoryFactoryMongodb);
export const bcryptjsService = new BcryptJsEncryptStrategy();

container.register<IUserRepository>('IUserRepository', {
  useValue: RepositoryFactoryManager.createRepository<IUserRepository>('user'),
});
container.register<IEncryptStrategy>('IEncryptStrategy', {
  useValue: bcryptjsService,
});
container.registerSingleton(UserServiceFacade);
container.registerSingleton(UserController);
container.registerSingleton(UserAuthController);

export const userController = container.resolve(UserController);
export const authController = container.resolve(UserAuthController);
