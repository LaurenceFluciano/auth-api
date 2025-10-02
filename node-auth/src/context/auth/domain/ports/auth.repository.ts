import { FactorMethod, TFactors } from '../entities/type.factor';

export interface IAuthRepository {
  setFactorMethod(
    userId: Id,
    factors: TFactors,
    factorMethod: FactorMethod,
  ): MaybePromise<boolean>;
  getFactorMethod(
    userId: Id,
    factor: TFactors,
    type: string,
  ): MaybePromise<FactorMethod | null>;
}
