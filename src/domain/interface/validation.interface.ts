import { ID } from "./user.repository";

export interface IdValidator 
{
    isValidId(id: ID): boolean
}

