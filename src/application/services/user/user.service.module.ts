import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "src/infrastructure/mongodb/modules/mongoose.user.module";
import { UserValidationModule } from "src/infrastructure/mongodb/modules/mongoose.user.validation.module";
import { CryptoModule } from "src/infrastructure/utils/crypto.module";
import { CreateUserService } from "./create.user.service";
import { PatchUserService } from "./patch.user.service";
import { GetUserService } from "./get.user.service";

@Module({
   imports: [UserRepositoryModule, UserValidationModule, CryptoModule],
   providers: [CreateUserService,GetUserService, PatchUserService],
   exports: [CreateUserService,GetUserService, PatchUserService]
})

export class UserServiceModule {}
