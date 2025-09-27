import { DomainException } from "../error/domain.exception";
import { DomainErrorType } from "../error/domain.exception.enum";

export class Name
{
    private readonly MINIMAL_NAME_SIZE = 4;

    constructor(private name: string)
    {
        this.validate(name);
    }

    private validate(name: string): void
    {
        if ((!name || name.trim().length < this.MINIMAL_NAME_SIZE)) 
            throw new DomainException("Nome de usuário não pode estar vazio.",DomainErrorType.INVALID_VALUE);
    }

    public getValue(): string
    {
        return this.name;
    }
}