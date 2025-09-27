import { Module } from "@nestjs/common";

/* Schema */
import { MongooseSchemaModule } from "../../../../config/mongoose.schema.module";

/* Domain */
import { USER_CREATOR_REPOSITORY, USER_GETTER_REPOSITORY, USER_UPDATE_REPOSITORY } from "src/user/domain/interface/repository.token";

/* Repository */
import { CreateUserMongoDBRepository } from "src/user/infrastructure/mongodb/repository/create.repository";
import { GetUserMongoDBRepository } from "src/user/infrastructure/mongodb/repository/getter.repository";
import { UpdateUserMongoDBRepository } from "src/user/infrastructure/mongodb/repository/update.repository";

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