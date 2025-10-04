import {
  ICreateRepository,
  IFindRepository,
} from 'src/templates/context/domain/repository';
import { UserPersistence } from '../entities/type.user';
import { User } from '../entities/user';

export interface IUserRepository
  extends ICreateRepository<User>,
    IFindRepository<UserPersistence> {
  findByCredential(
    email: string,
    projectKey: string,
  ): MaybePromise<UserPersistence | null>;
  findManyByIds(ids: Id[]): MaybePromise<UserPersistence[]>;
  saveChanges(
    id: Id,
    changes: Partial<Omit<UserPersistence, 'id'>>,
  ): MaybePromise<Partial<UserPersistence> | null>;
}
