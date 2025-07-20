import { UserEntity } from "src/domain/entities/user.entities";

export type ID = string
 
export interface UserCreatorRepository {
  create(entity: UserEntity<ID>, options?: {}): Promise<ID>;
}

export interface UserGetterRepsitory 
{
  getUserById(id: ID, options?: {}): Promise<UserEntity<ID> | null>;
  getUserByCredential(email: string, projectKey: string, options?: {}): Promise<UserEntity<ID> | null>;
}

export interface UserUpdateRepository
{
  addScopes(id: ID, scopes: string[], options?: {}): Promise<UserEntity<ID>>;
  updateUsername(id: ID, name: string, options?: {}): Promise<UserEntity<ID>>;
  updateStatus(id: ID, status: boolean, options?: {}): Promise<UserEntity<ID>>;
  updatePassword(id: ID, password: string, options?: {}): Promise<void>;
  addScopedPermissions(id: ID, name: string[], permissions: string , options?: {}): Promise<UserEntity<ID>>;
}
