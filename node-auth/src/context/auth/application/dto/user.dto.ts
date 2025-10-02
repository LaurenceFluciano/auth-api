import { FactorMethod, TFactors } from '../../domain/entities/type.factor';

export type TUserAuthDto = {
  userId: string;
  name: string;
  email: string;
  projectKey: string;
  factors: Map<TFactors, FactorMethod[]>;
  scopes?: string[];
};
