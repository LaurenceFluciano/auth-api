import { UseCaseErrorType } from "./usecase.exeception.enum"

export class UseCaseException extends Error
{
    constructor(
        message: string,
        public typeStatus?: UseCaseErrorType
    )
    {
        super(message)
        Object.setPrototypeOf(this, UseCaseException.prototype)
    }
}