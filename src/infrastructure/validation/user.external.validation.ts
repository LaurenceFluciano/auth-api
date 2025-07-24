import validator from "validator";
import { PasswordValidator } from "./password.validation";

// Utilize uma pré-implementação de dominio para evitar erros e repetição!
import { AbstractUserExternalValidation } from "src/domain/abstract/user.validation.abstract";


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
