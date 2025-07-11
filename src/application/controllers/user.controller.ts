import { Body, Controller, Post, Get, Patch, Param, HttpCode, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dtos/users/create.user.dto';
import { GetByCredentialsDTO, GetUserIdDTO } from '../dtos/users/get.user.dto';
import { PatchUserNameDTO, PatchUserScopesDTO, PatchUserStatusDTO } from '../dtos/users/patch.user.dto';


@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  @HttpCode(201)
  createUser(
    @Body() dtoBody: CreateUserDTO
  )
  {
    return "[POST] Must to be Implemeted";
  }


  @Get(":id")
  getUserById(
    @Param() dtoParam: GetUserIdDTO
  )
  {
    return "[GET BY ID] Must to be Implemeted";
  }


  @Get("by-credentials")
  getUserByCredentials(
    @Query() dtoQuery: GetByCredentialsDTO
  )
  {
    return "[GET BY CREDENTIALS] Must to be Implemeted";
  }


  @Patch(":id")
  updateUserName(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchUserNameDTO
  )
  {
    return "[UPDATE NAME] Must to be Implemeted";
  }

  @Patch(":id/scopes/")
  updateUserScopes(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchUserScopesDTO
  )
  {
    return "[UPDATE SCOPES] Must to be Implemeted";
  }

  @Patch(":id/status/")
  updateUserStatus(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchUserStatusDTO
  )
  {
    return "[UPDATE STATUS] Must to be Implemeted";
  }
}
