import { UserDTO } from "../dtos/user.entity.dto";
import { Id } from "src/utils/interface/id/abstract.id";
 
export interface UserCreatorRepository {
  create(entity:UserDTO, options?: {}): Promise<Id>;
}

export interface UserGetterRepsitory 
{
  getUserById(id: Id, options?: {}): Promise<UserDTO | null>;
  getUserByCredential(email: string, projectKey: string, options?: {}): Promise<UserDTO | null>;
  getUserByScopeAndName?(scopes: string[], name: string, options?: {}): Promise<UserDTO[] | null>; 
}

export interface UserUpdateRepository
{
  addScopes(id: Id, scopes: string[], options?: {}): Promise<UserDTO | null>;
  updateUsername(id: Id, name: string, options?: {}): Promise<UserDTO | null>;
  updateStatus(id: Id, status: boolean, options?: {}): Promise<UserDTO | null>;
  updatePassword(id: Id, password: string, options?: {}): Promise<void | null>;
  addScopedPermissions(id: Id, name: string[], permissions: string , options?: {}): Promise<UserDTO>;
}
