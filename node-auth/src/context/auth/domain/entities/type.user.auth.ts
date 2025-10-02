import { FactorMethod, TFactors } from './type.factor';

export interface TUserAuth {
  userId: string;
  factors: Record<TFactors, FactorMethod[]>;
}
