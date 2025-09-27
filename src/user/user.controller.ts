/* Framework and external import */
import { Body, Controller, Post, Get, Patch, Param, HttpCode, Query, Logger, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

/* DTOs */
import { CreateUserDTO } from 'src/user/application/dtos/create.dto';
import { PatchUserNameDTO, PatchUserScopesDTO, PatchUserActiveDTO } from 'src/user/application/dtos/patch.dto';
import { GetByCredentialsDTO, GetUserIdDTO } from 'src/user/application/dtos/get.dto';
import { SafeUserResponseDTO } from 'src/user/application/dtos/response.dto';
import { PatchPasswordDTO, RecoveryCodeDTO } from 'src/user/application/dtos/password.dto';

/* Services */
import { CreateUserService } from 'src/user/application/service/create.service';
import { GetUserService } from 'src/user/application/service/get.service';
import { PatchUserService } from 'src/user/application/service/patch.service';
import { UserPasswordService } from 'src/user/application/service/password.service';

@ApiTags('user')
@Controller("v1/users")
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
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: 'User created and id returned successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid input data. Possible causes: invalid scope, email, projectKey, username or password.' })
  @ApiInternalServerErrorResponse({description: "Internal server error."})
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
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User found and returned successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiInternalServerErrorResponse({description: "Internal server error."})
  async getUserByCredentials(
    @Query() dtoQuery: GetByCredentialsDTO
  ): Promise<SafeUserResponseDTO>
  {
    const user = await this.getUserService.getUserByCredentials(dtoQuery);
    const {password, ...safeUser} = user
    return safeUser;
  }
  
  /** [GET METHOD] getUserById
   * 
   * @param dtoParam 
   * @returns  GetUserResponseDTO
   */

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User found and returned successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiInternalServerErrorResponse({description: "Internal server error."})
  async getUserById(
    @Param() dtoParam: GetUserIdDTO
  ): Promise<SafeUserResponseDTO>
  {
    const user = await this.getUserService.getUserById(dtoParam);
    const {password, ...safeUser} = user;
    return safeUser;
  }

  /** [PATCH METHOD] updateUserName
   * 
   * @param dtoParam 
   * @param dtoBody 
   * @returns Promise<PatchUserNameDTO>
   */

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User updated and name returned successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Invalid username.' })
  @ApiInternalServerErrorResponse({description: "Internal server error."})
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
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User updated and scopes returned successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Invalid scopes.' })
  @ApiInternalServerErrorResponse({description: "Internal server error."})
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
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User updated and status returned successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({ description: 'Invalid status.' })
  @ApiInternalServerErrorResponse({description: "Internal server error."})
  async updateUserActive(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchUserActiveDTO
  ): Promise<PatchUserActiveDTO>
  {
    const updated = await this.updateUserService.updateActive(dtoParam, dtoBody);
    return updated;
  }


  @Patch(":id/password") 
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User password successfully.' })
  @ApiNotFoundResponse({ description: "User not found or your auth service context doesn't have password." })
  @ApiBadRequestResponse({ description: '"Invalid input or password mismatch.' })
  @ApiForbiddenResponse({description: "Current password incorrect."})
  @ApiInternalServerErrorResponse({description: "Internal server error."})
  async updateUserPassword(
    @Param() dtoParam: GetUserIdDTO,
    @Body() dtoBody: PatchPasswordDTO
  ){
    await this.updateUserService.updateUserPassword(dtoParam,dtoBody);
    return {message: "Password updated"};
  }


  @Post("/password") 
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'User password successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiBadRequestResponse({description: "This context application don't have password auth."})
  @ApiInternalServerErrorResponse({description: "Internal server error."})
  async getRecoveryCode(
    @Body() dtoBody: GetByCredentialsDTO
  ){
    await this.passwordService.sendRecoveryCode(dtoBody);
    return {message: "Recovery code sent"};
  }

  @Post("/password/:id/recovery-code")
  @ApiOkResponse({ description: 'User password successfully.' })
  @ApiNotFoundResponse({ description: '"Invalid code or expired.' })
  @ApiBadRequestResponse({description: "Invalid password generate a new code to try again or Invalid password format."})
  @ApiInternalServerErrorResponse({description: "Internal server error."})
  async getPasswordRecoveryCode(
    @Param() dtoId: GetUserIdDTO,
    @Body() dtoCode: RecoveryCodeDTO
  ) {
    const result = await this.passwordService.recoveryPassword(dtoId,dtoCode);
    return result
  }
}
