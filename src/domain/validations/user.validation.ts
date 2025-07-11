export abstract class AbstractExternalValidation
{
    public emailValidation(email: string): boolean
    {
        return typeof email === "string" && email.includes("@") && email.length > 5;
    }
}

import { ExternalValidation } from "src/infrastructure/validation/email.validation";
import { PasswordValidator } from "./password.validation";

const MINIMAL_USER_NAME_SIZE = 4;
const MINIMAL_PROJECT_KEY_SIZE = 4;

export class UserValidation {
    private externalValidation: AbstractExternalValidation = new ExternalValidation()

    isValidUsername(name: any): boolean {
        if (name.trim().length < MINIMAL_USER_NAME_SIZE) return false;
        return true;
    }

    isValidProjectKey(projectKey: string): boolean
    {
        return !(projectKey.trim().length < MINIMAL_PROJECT_KEY_SIZE);
    }

    isValidEmail(email: string): boolean
    {
        return this.externalValidation.emailValidation(email);
    }

    isValidPassword(password: string): boolean
    {
        return PasswordValidator.isValid(password);
    }
}
