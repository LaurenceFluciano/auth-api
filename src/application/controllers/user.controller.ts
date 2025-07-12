import { Body, Controller, Post, Get, Patch, Param, HttpCode, Query } from '@nestjs/common';
import { CreateUserService } from '../services/create.user.service';
import { GetUserService } from '../services/get.user.service';
import { CreateUserDTO } from '../dtos/users/create.user.dto';
import { PatchUserService } from '../services/patch.user.service';
import { GetByCredentialsDTO, GetUserIdDTO } from '../dtos/users/get.user.dto';
import { PatchUserNameDTO, PatchUserScopesDTO, PatchUserActiveDTO } from '../dtos/users/patch.user.dto';


@Controller("users")
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly updateUserService: PatchUserService
  ) {}


  /** [POST METHOD] createUser
   * 
   * @param dtoBody 
   * @returns GetUserIdDTO
   */

  @Post()
  @HttpCode(201)
  async createUser(
    @Body() dtoBody: CreateUserDTO
  ): Promise<GetUserIdDTO>
  {
    const id = await this.createUserService.create(dtoBody);
    return id;
  }

  /** [GET METHOD] getUserById
   * 
   * @param dtoParam 
   * @returns  GetUserResponseDTO
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
   * @returns GetUserResponseDTO
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
   * @returns Promise<PatchUserNameDTO>
   */

  @Patch(":id")
  @HttpCode(200)
  async updateUserName(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchUserNameDTO
  ) /*: Promise<PatchUserNameDTO>*/
  {
    return "[UPDATE NAME] Must to be Implemeted";
  }

  /** [PATCH METHOD] updateUserScopes
   * 
   * @param dtoParam 
   * @param dtoBody 
   * @returns Promise<PatchUserScopesDTO>
   */

  @Patch(":id/scopes/")
  @HttpCode(200)
  async updateUserScopes(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchUserScopesDTO
  ) /*: Promise<PatchUserScopesDTO>*/
  {
    return "[UPDATE SCOPES] Must to be Implemeted";
  }

  /** [PATCH METHOD] updateUserActive
   * 
   * @param dtoParam 
   * @param dtoBody 
   * @returns Promise<PatchUserActiveDTO>
   */

  @Patch(":id/status/")
  @HttpCode(200)
  async updateUserActive(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchUserActiveDTO
  ) /*: Promise<PatchUserActiveDTO>*/
  {
    return "[UPDATE ACTIVE] Must to be Implemeted";
  }
}
