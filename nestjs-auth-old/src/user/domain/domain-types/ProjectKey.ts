import { DomainException } from "../error/domain.exception";
import { DomainErrorType } from "../error/domain.exception.enum";

export class ProjectKey
{
    private readonly MINIMAL_PROJECT_KEY_SIZE = 4;

    constructor(private projectKey: string)
    {
        this.validate(projectKey);
    }

    private validate(projectKey: string): void
    {
        if (
            projectKey.trim().length === 0 ||
            projectKey.trim().length < this.MINIMAL_PROJECT_KEY_SIZE
        ) 
            throw new DomainException("Project Key não pode estar vazio.",DomainErrorType.INVALID_VALUE);
    }

    public getValue(): string
    {
        return this.projectKey;
    }
}