import { Module } from "@nestjs/common";
import { MongooseIdValidation } from "../../validation/objectid.validation";
import { ID_VALIDATION } from "src/domain/ports/validations.ports";

@Module({
    providers: [
        {
            provide: ID_VALIDATION,
            useClass: MongooseIdValidation
        }
    ],
    exports: [ID_VALIDATION]
})
export class IdValidationModule {} 