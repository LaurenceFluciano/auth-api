import { Module } from "@nestjs/common";
import { MongooseIdValidation } from "../../validations/objectid.validation";
import { ID_VALIDATION } from "src/user/domain/validations/validations.token";

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