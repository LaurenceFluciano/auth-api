import { Module } from "@nestjs/common";
import { UserController } from "../interface/http/controllers/user.controller";
import { UserServiceModule } from "./services/user/user.service.module";

@Module({
   imports: [UserServiceModule],
   controllers: [UserController],
   exports: [UserServiceModule]
})

export class UserModule {}
