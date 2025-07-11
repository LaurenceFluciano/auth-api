import { Module } from "@nestjs/common";
import { USER_CREATOR_REPOSITORY, USER_GETTER_REPOSITORY, USER_UPDATE_REPOSITORY } from "src/domain/interface/user.repository.ports";
import { MongooseSchemaModule } from "./mongoose.schema.module";
import { CreateUserMongoDBRepository } from "../repository/user.create.repository";
import { GetUserMongoDBRepository } from "../repository/user.getter.repository";
import { UpdateUserMongoDBRepository } from "../repository/user.update.repository";

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
        },
        {
            provide: USER_UPDATE_REPOSITORY,
            useClass: UpdateUserMongoDBRepository
        }
    ],
    exports: [USER_CREATOR_REPOSITORY,USER_GETTER_REPOSITORY]
})
export class UserRepositoryModule {} 