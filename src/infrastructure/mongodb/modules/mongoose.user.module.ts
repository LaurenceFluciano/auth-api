import { Module } from "@nestjs/common";
import { CreateUserMongoDBRepository } from "../repository/user.create.repository";
import { USER_CREATOR_REPOSITORY, USER_GETTER_REPOSITORY } from "src/domain/interface/user.repository.ports";
import { MongooseSchemaModule } from "./mongoose.schema.module";
import { GetUserMongoDBRepository } from "../repository/user.getter.repository";

@Module({
    imports: [
        MongooseSchemaModule
    ],
    providers: [
        {
            provide: USER_CREATOR_REPOSITORY,
            useClass: CreateUserMongoDBRepository
        },
        {
            provide: USER_GETTER_REPOSITORY,
            useClass: GetUserMongoDBRepository
        }
    ],
    exports: [USER_CREATOR_REPOSITORY,USER_GETTER_REPOSITORY]
})
export class UserRepositoryModule {} 