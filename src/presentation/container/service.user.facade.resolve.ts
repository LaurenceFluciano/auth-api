import { container } from 'tsyringe';
import { UserServiceFacade } from '../service/user.service';
import { UserRepositoryFactory } from '../factory/director.factory';

const userRepository = new UserRepositoryFactory().createRepository();

container.register('IUserRepository', {
  useValue: userRepository,
});

export const userService = container.resolve(UserServiceFacade);
