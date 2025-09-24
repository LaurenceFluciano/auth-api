import { IExternalValidators } from '../../../../share/context/base/domain/validator';

export type TUserDto = {
  name: string;
  email: string;
  projectKey: string;
  id?: Id;
  scopes?: string[];
};

export type TUserEntity = {
  name: string;
  email: string;
  scopes?: string[];
};

export type TUserValidators = {
  email?: IExternalValidators;
};
