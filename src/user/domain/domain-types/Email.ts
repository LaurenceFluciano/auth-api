import { DomainException } from "../error/domain.exception";
import { DomainErrorType } from "../error/domain.exception.enum";

export class Email
{
    constructor(private email: string)
    {
        this.validate(email)
    }

    private validate(email: string): void
    {
        if (typeof email !== "string" || !email.includes("@") || email.length <= 5)
            throw new DomainException("Invalid email.", DomainErrorType.INVALID_VALUE);
    }

    public getValue(): string
    {
        return this.email;
    }
}

