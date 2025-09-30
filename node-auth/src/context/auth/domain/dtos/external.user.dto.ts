export type IUserDto = {
  name: string;
  email: string;
  projectKey: string;
  id?: Id;
  scopes?: string[];
};

export type IRegisterUserDto = {
  name: string;
  email: string;
  projectKey: string;
};
