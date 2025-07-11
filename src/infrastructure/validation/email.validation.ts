import validator from "validator";
import { AbstractExternalValidation } from "src/domain/validations/user.validation";

export class ExternalValidation extends AbstractExternalValidation {
  public emailValidation(email: string): boolean {
    try {
      return validator.isEmail(email);
    } catch (err) {
      console.warn("[WARN] validator.isEmail falhou. Usando fallback do domínio.");
      return super.emailValidation(email);
    }
  }
}
