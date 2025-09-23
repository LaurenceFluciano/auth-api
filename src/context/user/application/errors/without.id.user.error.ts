import { UseCaseException } from "src/share/error/application/usecase.error";


export class IdNotDefinedUseCaseError extends UseCaseException {
    constructor(){super("Have users with id not defined!")}
}