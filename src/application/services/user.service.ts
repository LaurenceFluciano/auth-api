import { CreateUserService } from "./create.user.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService 
extends CreateUserService 
{}

