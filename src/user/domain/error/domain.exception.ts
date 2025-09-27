import { DomainErrorType } from "./domain.exception.enum"

export class DomainException extends Error
{
    constructor(
        message: string,
        public typeStatus?: DomainErrorType
    )
    {
        super(message)
        Object.setPrototypeOf(this, DomainException.prototype)
    }
}