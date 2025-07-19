import { Body, Controller, Post, Get, Patch, Param, HttpCode, Query, HttpStatus } from '@nestjs/common';
import { CreateUserService } from '../services/user/create.user.service';
import { GetUserService } from '../services/user/get.user.service';
import { CreateUserDTO } from '../dtos/users/create.user.dto';
import { PatchUserService } from '../services/user/patch.user.service';
import { GetByCredentialsDTO, GetUserIdDTO } from '../dtos/users/get.user.dto';
import { PatchUserNameDTO, PatchUserScopesDTO, PatchUserActiveDTO } from '../dtos/users/patch.user.dto';
import { GetUserResponseDTO } from '../dtos/users/response.user.dto';
import { PatchPasswordDTO } from '../dtos/users/user.password.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserPasswordService } from '../services/user/password.user.service';

@ApiTags('user')
@Controller("users")
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly updateUserService: PatchUserService,
    private readonly passwordService: UserPasswordService
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
  ): Promise<GetUserResponseDTO>
  {
    const user = await this.getUserService.getUserById(dtoParam);
    return user;
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
  ) : Promise<GetUserResponseDTO>
  {
    const user = await this.getUserService.getUserByCredentials(dtoQuery);
    return user;
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
  ): Promise<PatchUserNameDTO>
  {
    const updated = await this.updateUserService.updateUsername(dtoParam, dtoBody);
    return updated;
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
  ) : Promise<PatchUserScopesDTO>
  {
    const updated = await this.updateUserService.updateUserScopes(dtoParam, dtoBody);
    return updated;
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
  ): Promise<PatchUserActiveDTO>
  {
    const updated = await this.updateUserService.updateActive(dtoParam, dtoBody);
    return updated;
  }


  @Patch(":id/password") 
  @HttpCode(200)
  async updateUserPassword(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchPasswordDTO
  ){
    await this.updateUserService.updateUserPassword(dtoParam,dtoBody);
    return {message: "Password updated"};
  }


  @Post("/password") 
  @HttpCode(200)
  async getRecoveryCode(
    @Body() dtoBody: GetByCredentialsDTO
  ){
    await this.passwordService.sendRecoveryCode(dtoBody);
    return {message: "Recovery code sent"};
  }
}
