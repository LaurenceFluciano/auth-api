import { MongoUserRepository } from 'src/context/user/infra/database/repositories/user.repository';
import { container } from 'tsyringe';
import { UserServiceFacade } from '../service/user.service';

container.register('IUserRepository', {
  useClass: MongoUserRepository,
});

export const userService = container.resolve(UserServiceFacade);
