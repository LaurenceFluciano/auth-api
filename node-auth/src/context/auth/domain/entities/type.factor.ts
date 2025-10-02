export type TFactors =
  | 'knowledge'
  | 'possession'
  | 'inherence'
  | 'location'
  | 'behavior';

export interface FactorMethod {
  type: string;
  secret: string;
  createdAt?: Date;
  updatedAt?: Date;
}
