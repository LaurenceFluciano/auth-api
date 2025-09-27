import { container } from 'tsyringe';
import { UserServiceFacade } from '../service/user.service';
import { UserRepositoryFactory } from '../factory/director.factory';
import { UserController } from '../controllers/user.controller';
import { IUserRepository } from 'src/context/user/domain/ports/user.repository';

const userRepository = new UserRepositoryFactory().createRepository();

container.register<IUserRepository>('IUserRepository', {
  useValue: userRepository,
});
container.registerSingleton(UserServiceFacade);
container.registerSingleton(UserController);

export const userController = container.resolve(UserController);
