export class PasswordValidator {
  private static readonly REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\[\]{};:,.<>/?\\|~-])[A-Za-z\d!@#$%^&*()_+=\[\]{};:,.<>/?\\|~-]{8,}$/;

  private static readonly ILLEGAL_CHARS_REGEX = /['"`´¨^~çãáàéèíìóòúùâêîôûÇÃÁÀÉÈÍÌÓÒÚÙÂÊÎÔÛ]|[^\x00-\x7F]/;

  public static isValid(password: string): boolean {
    if (typeof password !== "string") return false;
    if (this.ILLEGAL_CHARS_REGEX.test(password)) return false;
    return this.REGEX.test(password);
  }
}