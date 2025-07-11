import { Body, Controller, Post, Get, Patch, Param, HttpCode, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dtos/users/create.user.dto';
import { GetByCredentialsDTO, GetUserIdDTO } from '../dtos/users/get.user.dto';
import { PatchUserNameDTO, PatchUserScopesDTO, PatchUserActiveDTO } from '../dtos/users/patch.user.dto';


@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}


  /** [POST METHOD] createUser
   * 
   * @param dtoBody 
   * @returns new GetUserIdDTO()
   */

  @Post()
  @HttpCode(201)
  async createUser(
    @Body() dtoBody: CreateUserDTO
  ): Promise<GetUserIdDTO>
  {
    const user = await this.userService.create(dtoBody);
    return user;
  }

  /** [GET METHOD] getUserById
   * 
   * @param dtoParam 
   * @returns  new GetUserResponseDTO()
   */

  @Get(":id")
  @HttpCode(200)
  async getUserById(
    @Param() dtoParam: GetUserIdDTO
  ) /*: Promise<GetUserResponseDTO>*/
  {
    return "[GET BY ID] Must to be Implemeted";
  }

  /** [GET METHOD] getUserByCredentials
   * 
   * @param dtoQuery 
   * @returns new GetUserResponseDTO()
   */

  @Get("by-credentials")
  @HttpCode(200)
  async getUserByCredentials(
    @Query() dtoQuery: GetByCredentialsDTO
  ) /*: Promise<GetUserResponseDTO>*/
  {
    return "[GET BY CREDENTIALS] Must to be Implemeted";
  }

  /** [PATCH METHOD] updateUserName
   * 
   * @param dtoParam 
   * @param dtoBody 
   * @returns Promise<{"name":"string"}>
   */

  @Patch(":id")
  @HttpCode(200)
  async updateUserName(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchUserNameDTO
  ) /*: Promise<{"name":"string"}>*/
  {
    return "[UPDATE NAME] Must to be Implemeted";
  }

  /** [PATCH METHOD] updateUserScopes
   * 
   * @param dtoParam 
   * @param dtoBody 
   * @returns Promise<{"scopes":["string"]}>
   */

  @Patch(":id/scopes/")
  @HttpCode(200)
  async updateUserScopes(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchUserScopesDTO
  ) /*: Promise<{"scopes":["string"]}>*/
  {
    return "[UPDATE SCOPES] Must to be Implemeted";
  }

  /** [PATCH METHOD] updateUserStatus
   * 
   * @param dtoParam 
   * @param dtoBody 
   * @returns Promise<{"active": boolean }>
   */

  @Patch(":id/status/")
  @HttpCode(200)
  async updateUserActive(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchUserActiveDTO
  ) /*: Promise<{"active": boolean }>*/
  {
    return "[UPDATE ACTIVE] Must to be Implemeted";
  }
}
