import { IUserRepository } from 'src/context/user/domain/ports/user.repository';
import { IRepositoryFactory } from 'src/templates/global/factories/factories.repository';

export type IUserRepositoryFactory = IRepositoryFactory<IUserRepository>;
