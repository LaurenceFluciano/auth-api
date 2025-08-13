import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserServiceModule } from "./application/services/user.service.module";

@Module({
   imports: [UserServiceModule],
   controllers: [UserController],
   exports: [UserServiceModule]
})

export class UserModule {}
