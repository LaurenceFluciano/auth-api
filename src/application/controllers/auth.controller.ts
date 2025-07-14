import { Body, Controller, Post, HttpCode, Headers } from '@nestjs/common';
import { LoginDTO, LoginResponseDTO } from '../dtos/auth/auth.dto';
import { AuthService } from '../services/auth/user.auth.service';
import { BadRequestException } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private authService: AuthService
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

    this.logger.log(`ProjectKey recebido: ${projectKey}`)

    const result = await this.authService.login(
      {
        email: dtoBody.email,
        password:dtoBody.password,
        projectKey:projectKey})
    return result;
  }

}
