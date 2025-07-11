import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dtos/users/create.user.dto';

@Controller("users/")
export class UserController {
  constructor(private readonly userService: UserService) {}

}
