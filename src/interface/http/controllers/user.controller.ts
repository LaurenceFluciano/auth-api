/* Framework and external import */
import { Body, Controller, Post, Get, Patch, Param, HttpCode, Query, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/* DTOs */
import { CreateUserDTO } from 'src/application/dtos/users/create.user.dto';
import { PatchUserNameDTO, PatchUserScopesDTO, PatchUserActiveDTO } from 'src/application/dtos/users/patch.user.dto';
import { GetByCredentialsDTO, GetUserIdDTO } from 'src/application/dtos/users/get.user.dto';
import { GetUserResponseDTO } from 'src/application/dtos/users/response.user.dto';
import { PatchPasswordDTO, RecoveryCodeDTO } from 'src/application/dtos/users/user.password.dto';

/* Services */
import { CreateUserService } from 'src/application/services/user/create.user.service';
import { GetUserService } from 'src/application/services/user/get.user.service';
import { PatchUserService } from 'src/application/services/user/patch.user.service';
import { UserPasswordService } from 'src/application/services/user/password.user.service';

@ApiTags('user')
@Controller("users")
export class UserController {
  private readonly logger = new Logger(UserController.name);
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
  
    /** [GET METHOD] getUserByCredentials
     * 
     * @param dtoQuery 
     * @returns GetUserResponseDTO
     */
  
    @Get("by-credentials")
    async getUserByCredentials(
      @Query() dtoQuery: GetByCredentialsDTO
    ): Promise<GetUserResponseDTO>
    {
      const user = await this.getUserService.getUserByCredentials(dtoQuery);
      return user;
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

  @Post("/password/:id/recovery-code")
  async getPasswordRecoveryCode(
    @Param() dtoId: GetUserIdDTO,
    @Body() dtoCode: RecoveryCodeDTO
  ) {
    const result = await this.passwordService.recoveryPassword(dtoId,dtoCode);
    return result
  }
}
