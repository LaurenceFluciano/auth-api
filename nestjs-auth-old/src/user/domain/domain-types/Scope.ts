import { DomainException } from "../error/domain.exception";
import { DomainErrorType } from "../error/domain.exception.enum";

export class Scope
{
    constructor(private scope: string)
    {
        this.validate(scope);
    }

    private validate(scope: string): void
    {
        const regex = /^([A-Za-z]*:)?([A-Za-z0-9_-]+)$/
        if(!regex.test(scope))
            throw new DomainException("Invalid scope.", DomainErrorType.INVALID_VALUE)
    }

    public getValue(): string
    {
        return this.scope;
    }
}