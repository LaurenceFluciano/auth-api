import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "src/infrastructure/mongodb/modules/mongoose.user.module";
import { UserService } from "./user.service";

@Module({
   imports: [UserRepositoryModule],
   providers: [UserService],
   exports: [UserService]
})

export class UserServiceModule {}
