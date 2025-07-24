import { Module } from "@nestjs/common";

/* Schema */
import { MongooseSchemaModule } from "./mongoose.schema.module";

/* Domain */
import { USER_CREATOR_REPOSITORY, USER_GETTER_REPOSITORY, USER_UPDATE_REPOSITORY } from "src/domain/ports/repositories/user.repository.token";

/* Repository */
import { CreateUserMongoDBRepository } from "src/infrastructure/mongodb/repository/user.create.repository";
import { GetUserMongoDBRepository } from "src/infrastructure/mongodb/repository/user.getter.repository";
import { UpdateUserMongoDBRepository } from "src/infrastructure/mongodb/repository/user.update.repository";

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
    exports: [USER_CREATOR_REPOSITORY,USER_GETTER_REPOSITORY, USER_UPDATE_REPOSITORY]
})
export class UserRepositoryModule {} 