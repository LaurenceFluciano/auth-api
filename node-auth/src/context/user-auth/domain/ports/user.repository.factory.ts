import { IUserRepository } from 'src/context/user-auth/domain/ports/user.repository';
import { IRepositoryFactory } from 'src/templates/factories/repository.factory';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserRepositoryFactory
  extends IRepositoryFactory<IUserRepository> {}
