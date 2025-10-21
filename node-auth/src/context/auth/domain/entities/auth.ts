import { TAuths } from './types.auth';

export class Auth {
  private auths: TAuths;

  constructor(auths: TAuths = {}) {
    this.auths = auths;
  }

  public addAuthMethod(newAuth: TAuths) {
    this.auths = { ...this.auths, ...newAuth };
  }

  public removeAuthMethod<T extends keyof TAuths>(type: T) {
    delete this.auths[type];
  }

  public getAuthMethod<T extends keyof TAuths>(type: T): TAuths[T] | null {
    return this.auths[type] ?? null;
  }

  public getInternalField() {
    return this.auths;
  }
}
