import {
  ICreateRepository,
  IFindRepository,
} from 'src/share/base/domain/base.repository';
import { TUser } from '../entities/type.user';

export interface IUserRepository
  extends ICreateRepository<TUser>,
    IFindRepository<TUser> {
  findByCredential(email: string, projectKey: string): MaybePromise<TUser>;
}
