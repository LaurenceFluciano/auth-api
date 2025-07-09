import { UserEntity } from "../entities/user.entities";

export type ID = string
 
export interface UserCreatorRepository {
  create(entity: UserEntity<ID>): Promise<ID>;
}