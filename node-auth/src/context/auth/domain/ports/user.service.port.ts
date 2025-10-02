export interface IUserServiceApi {
  getUserByCredential(
    email: string,
    projectKey: string,
  ): MaybePromise<{
    userId: string;
    email: string;
    projectKey: string;
    scopes: string[];
  }>;
}
