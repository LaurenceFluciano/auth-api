import { FactorMethod } from './type.factor';

export interface UserAuth {
  userId: string;
  factors: FactorMethod[];
}
