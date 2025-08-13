import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "src/user/infrastructure/mongodb/repository/mongoose.user.module";
import { IdValidationModule } from "src/shared/infrastructure/code/mongoose.id.validation.module";
import { CreateUserService } from "./service/create.service";
import { PatchUserService } from "./service/patch.service";
import { GetUserService } from "./service/get.service";
import { UserValidationModule } from "src/user/infrastructure/validation/user.validation.module";
import { EmailServiceModule } from "src/email/service/email.service.module";
import { CacheModule } from "src/cache/infrastructure/cache.module";
import { GenerateCodeModule } from "src/shared/infrastructure/code/recovery.code.generate.module";
import { UserPasswordService } from "./service/password.service";

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
