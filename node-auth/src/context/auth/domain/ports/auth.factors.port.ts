export interface IAuthFactors<T, O> {
  authenticate(credentials: T): MaybePromise<O>;
}

export interface IRegisterAuthFactors<T> {
  register(userId: Id, auth: T): MaybePromise<boolean>;
}

/**
 * Modelagem do usuário de auth
 *
 * "userId": "ObjectId",
 * "avaibleAuthMethods": ["password"]
 * "auths" : [
 * {
 *  "factor": "knowledge",
 *  "password":"******",
 *  "createdAt": "2025-09-30T12:00:00Z"
 * },
 * {
 *  "factor": "possession",
 *  "method": "otp",
 *  "secretKey": "******",
 *  "createAt": "2025-09-30T12:00:00Z"
 * }
 * ]
 *
 *
 */
