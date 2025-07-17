import { ID } from "src/infrastructure/mongodb/repository/test/user.repo.basic.test.kit";

export interface IdValidator 
{
    isValidId(id: ID): boolean
}

export const MINIMAL_USER_NAME_SIZE = 4;
export const MINIMAL_PROJECT_KEY_SIZE = 4;

export abstract class AbstractUserExternalValidation
{
    public isValidEmail(email: string): boolean
    {
        return typeof email === "string" && email.includes("@") && email.length > 5;
    }

    public isValidUsername(name: any): boolean {
        if (name.trim().length < MINIMAL_USER_NAME_SIZE) return false;
        return true;
    }

    public isValidProjectKey(projectKey: string): boolean
    {
        return !(projectKey.trim().length < MINIMAL_PROJECT_KEY_SIZE);
    }

    public abstract isValidPassword(password: string): boolean
}