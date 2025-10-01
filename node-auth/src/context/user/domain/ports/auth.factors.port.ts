export interface IAuthFactors<T, O> {
  authenticate(credentials: T): MaybePromise<O>;
}

export interface IRegisterAuthFactors<T> {
  register(userId: Id, auth: T): MaybePromise<boolean>;
}
