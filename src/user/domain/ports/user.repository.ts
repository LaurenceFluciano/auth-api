import { ICreateRepository, IFindRepository } from 'src/base/base.repository';
import { TUser } from '../entities/type.user';

export interface IUserRepository
  extends ICreateRepository<TUser>,
    IFindRepository<TUser> {
  findByCredential(email: string, projectKey: string): MaybePromise<TUser>;
}
