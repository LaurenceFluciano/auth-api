import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "src/infrastructure/mongodb/modules/mongoose.user.module";
import { IdValidationModule } from "src/infrastructure/mongodb/modules/mongoose.id.validation.module";
import { CreateUserService } from "./create.user.service";
import { PatchUserService } from "./patch.user.service";
import { GetUserService } from "./get.user.service";
import { UserValidationModule } from "src/infrastructure/validation/user.validation.module";
import { EmailServiceModule } from "src/email/email.service.module";
import { CacheModule } from "src/infrastructure/cache/cache.module";
import { GenerateCodeModule } from "src/infrastructure/generate.code.module";
import { UserPasswordService } from "./password.user.service";

@Module({
   imports: [
      UserRepositoryModule, 
      IdValidationModule, 
      UserValidationModule, 
      EmailServiceModule, 
      CacheModule, 
      GenerateCodeModule],
   providers: [
      CreateUserService,
      GetUserService, 
      PatchUserService, 
      UserPasswordService],
   exports: [
      CreateUserService,
      GetUserService, 
      PatchUserService, 
      UserValidationModule,
      UserPasswordService]
})

export class UserServiceModule {}
