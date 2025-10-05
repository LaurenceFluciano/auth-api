export type TUserAuthenticate = {
  email: string;
  projectKey: string;
  authCredentials: object;
};

export type TPasswordLogin = {
  email: string;
  projectKey: string;
  secret: string;
};
