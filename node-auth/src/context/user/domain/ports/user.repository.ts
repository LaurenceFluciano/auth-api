import {
  ICreateRepository,
  IFindRepository,
} from 'src/templates/context/base/domain/base.repository';
import { TUserDto } from '../entities/type.user';

export interface IUserRepository
  extends ICreateRepository<TUserDto>,
    IFindRepository<TUserDto> {
  findByCredential(
    email: string,
    projectKey: string,
  ): MaybePromise<TUserDto | null>;
  findManyByIds(ids: Id[]): MaybePromise<TUserDto[]>;
}
