import {
  ICreateRepository,
  IFindRepository,
} from 'src/templates/context/base/domain/base.repository';
import { TUserDto } from '../entities/type.user';
import { FactorMethod, TFactors } from '../entities/type.factor';

export interface IUserRepository
  extends ICreateRepository<TUserDto>,
    IFindRepository<TUserDto> {
  findByCredential(
    email: string,
    projectKey: string,
  ): MaybePromise<TUserDto | null>;

  registerAuth(factor: TFactors, auth: FactorMethod): MaybePromise<Id | null>;
  getMethodAuth(id: Id): MaybePromise<FactorMethod>;
}
