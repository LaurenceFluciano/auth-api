import { ValidatorEmail } from '../validations/email.validator';
import { ValidatorName } from '../validations/name.validator';

export type TUser = {
  name: string;
  email: string;
  id?: Id;
  projectKey?: string;
  scopes?: string[];
};

export type TUserValidators = {
  name: ValidatorName;
  email: ValidatorEmail;
};
