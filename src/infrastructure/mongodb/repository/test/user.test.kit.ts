// Domínio
import { UserEntity} from "../../../../domain/entities/user.entities";
import { ID } from "./user.repo.basic.test.kit";

// Factory para criar usuários de forma eficaz
export function simpleUserFactory(
  omittedFields: (keyof UserEntity<ID>)[] = [],
  differentEntity: number = 0,
  overrides: Partial<UserEntity<ID>> = {}
): 
[Partial<UserEntity<ID>>, number] 
{
  const entity: UserEntity<ID> = {
    name: "test" + differentEntity.toString(),
    email: "test" + differentEntity.toString()  +"@gmail.com",
    projectKey: "123" + differentEntity.toString(),
    scopes: ["test"],
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: ("123" + differentEntity.toString()) as ID,
    password: "test123",
    ...overrides
  };

  omittedFields.forEach((field) => {
    delete (entity as any)[field];
  });

  return [entity, differentEntity + 1];
}


export function isUserEntityComplete(entity: Partial<UserEntity<string>>): entity is UserEntity<string> {
  return (
    typeof entity.name === "string" &&
    typeof entity.email === "string" &&
    typeof entity.projectKey === "string" &&
    Array.isArray(entity.scopes) &&
    entity.scopes.length > 0
  );
}