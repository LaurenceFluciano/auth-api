import { ID } from "src/infrastructure/mongodb/repository/test/user.repo.basic.test.kit";
export interface IdValidator 
{
    isValidId(id: ID): boolean
}

