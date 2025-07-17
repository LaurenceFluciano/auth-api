import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "src/infrastructure/mongodb/modules/mongoose.user.module";
import { IdValidationModule } from "src/infrastructure/mongodb/modules/mongoose.id.validation.module";
import { CreateUserService } from "./create.user.service";
import { PatchUserService } from "./patch.user.service";
import { GetUserService } from "./get.user.service";
import { UserValidationModule } from "src/infrastructure/validation/user.validation.module";
import { EmailServiceModule } from "src/infrastructure/email/email.service.module";

@Module({
   imports: [UserRepositoryModule, IdValidationModule, UserValidationModule, EmailServiceModule],
   providers: [CreateUserService,GetUserService, PatchUserService],
   exports: [CreateUserService,GetUserService, PatchUserService, UserValidationModule]
})

export class UserServiceModule {}
