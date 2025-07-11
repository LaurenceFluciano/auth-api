import { UserEntity } from "../entities/user.entities";

export type ID = string
 
export interface UserCreatorRepository {
  create(entity: UserEntity<ID>): Promise<ID>;
}

export interface UserGetterRepsitory 
{
  getUserById(id: ID): Promise<UserEntity<ID> | null>;
  getUserByCredential(email: string, projectKey: string): Promise<UserEntity<ID> | null>;
}

export interface UserUpdateRepository
{
  updateScopes(id: ID, scopes: string[]): Promise<UserEntity<ID>>;
  updateUsername(id: ID, name: string): Promise<UserEntity<ID>>;
  updateStatus(id: ID, status: boolean): Promise<UserEntity<ID>>;
}