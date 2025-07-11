import { Module } from "@nestjs/common";
import { MongooseIdValidation } from "../../validation/objectid.validation";
import { USER_ID_VALIDATION } from "src/domain/interface/validations.ports";

@Module({
    providers: [
        {
            provide: USER_ID_VALIDATION,
            useClass: MongooseIdValidation
        }
    ],
    exports: [USER_ID_VALIDATION]
})
export class UserValidationModule {} 