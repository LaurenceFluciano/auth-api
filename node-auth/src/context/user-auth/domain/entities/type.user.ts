import { IExternalValidators } from 'src/templates/context/domain/validator';
import { TAuths } from './types.auth';

export type UserPersistence = {
  name: string;
  email: string;
  projectKey?: string;
  id?: Id;
  scopes?: string[];
  auths?: TAuths;
};

export type TUserValidators = {
  email?: IExternalValidators;
};
