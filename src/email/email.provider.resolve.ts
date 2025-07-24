import { EmailProvidersType } from "./email.strategy";

export class EmailProviderResolver {
    static resolveProvider(email: string): EmailProvidersType | null {
        const domain = email.split("@")[1].toLowerCase();

        if (domain.includes("gmail")) return "gmail";
        if (domain.includes("outlook") || domain.includes("hotmail")) return "outlook";

        return null;
    }
}