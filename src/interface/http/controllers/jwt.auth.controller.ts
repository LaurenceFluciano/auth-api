/* Framework and external imports */
import {Body, Headers, 
        Post, HttpCode, 
        Controller, 
        BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

/* DTOs */
import { LoginDTO, LoginResponseDTO } from 'src/application/dtos/auth/auth.dto';

/* Services */
import { AuthServiceJWT } from 'src/application/services/auth/auth.jwt.service';

@ApiTags('auth')
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthServiceJWT
  ) {}


  /** [POST METHOD] Login
   * 
   * @param dtoBody 
   * @param projectKey
   * @returns Promise<LoginResponseDTO>
   */

  @Post("login")
  @HttpCode(200)
  async login(
    @Body() dtoBody: LoginDTO,
    @Headers('x-project-key') projectKey: string
  ): Promise<LoginResponseDTO>
  {
    if (!projectKey) {
      throw new BadRequestException("x-project-key header is required");
    }

    const result = await this.authService.login(
      {
        email: dtoBody.email,
        password:dtoBody.password,
        projectKey:projectKey})
    return result;
  }

}
