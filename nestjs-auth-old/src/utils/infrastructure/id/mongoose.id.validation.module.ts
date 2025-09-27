import { Module } from "@nestjs/common";
import { MongooseIdValidation } from "./objectid.validation";
import { ID_VALIDATION } from "src/utils/interface/validations.tokens";

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