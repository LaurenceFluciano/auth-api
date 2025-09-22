import { IExternalValidators } from '../../../share/base/validator';

export type TUser = {
  name: string;
  email: string;
  id?: Id;
  projectKey?: string;
  scopes?: string[];
};

export type TUserValidators = {
  email?: IExternalValidators;
};
