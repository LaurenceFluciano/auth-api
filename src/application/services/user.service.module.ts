import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "src/infrastructure/mongodb/modules/mongoose.user.module";
import { UserValidationModule } from "src/infrastructure/mongodb/modules/mongoose.user.validation.module";
import { CryptoModule } from "src/infrastructure/utils/crypto.module";
import { UserService } from "./user.service";

@Module({
   imports: [UserRepositoryModule, UserValidationModule, CryptoModule],
   providers: [UserService],
   exports: [UserService]
})

export class UserServiceModule {}
