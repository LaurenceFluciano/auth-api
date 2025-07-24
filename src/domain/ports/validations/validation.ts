import { ID } from "src/infrastructure/mongodb/repository/test/user.repo.basic.test.kit";

export interface IdValidator 
{
    isValidId(id: ID): boolean
}

export interface UserValidation {
    isValidEmail(email: string): boolean,
    isValidUsername(name: string): boolean,
    isValidProjectKey(projectKey: string): boolean,
    isValidScopes(scope: string): boolean,
    isValidActive(active: unknown): boolean,
    isValidPassword(password: string): boolean
}