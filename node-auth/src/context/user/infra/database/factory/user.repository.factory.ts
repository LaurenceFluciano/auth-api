import { IUserRepository } from 'src/context/user/domain/ports/user.repository';

export interface IUserRepositoryFactory {
  createRepository(): IUserRepository;
}
