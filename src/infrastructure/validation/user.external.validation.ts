import validator from "validator";
import { AbstractUserExternalValidation } from "src/domain/ports/validation.interface";
import { PasswordValidator } from "./password.validation";

export class ExternalUserValidation extends AbstractUserExternalValidation {
  public isValidEmail(email: string): boolean {
    try {
      return validator.isEmail(email);
    } catch (err) {
      console.warn("[WARN] validator.isEmail falhou. Usando fallback do domínio.");
      return super.isValidEmail(email);
    }
  }

  isValidPassword(password: string): boolean
  {
    return PasswordValidator.isValid(password);
  }
}
