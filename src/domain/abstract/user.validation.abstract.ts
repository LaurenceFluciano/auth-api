import { UserValidation } from "../ports/validations/validation";

export const MINIMAL_USER_NAME_SIZE = 4;
export const MINIMAL_PROJECT_KEY_SIZE = 4;

export abstract class AbstractUserExternalValidation implements UserValidation
{
    public isValidEmail(email: string): boolean
    {
        return typeof email === "string" && email.includes("@") && email.length > 5;
    }

    public isValidUsername(name: string): boolean {
        if (name.trim().length < MINIMAL_USER_NAME_SIZE) return false;
        return true;
    }

    public isValidProjectKey(projectKey: string): boolean
    {
        return !(projectKey.trim().length < MINIMAL_PROJECT_KEY_SIZE);
    }

    public isValidScopes(scope: string): boolean
    {
        const regex = /^([A-Za-z]*:)?([A-Za-z0-9_-]+)$/
        return regex.test(scope)
    }

    public isValidActive(active: unknown): boolean
    {
        return typeof active === "boolean"
    }

    public abstract isValidPassword(password: string): boolean
}