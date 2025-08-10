/* Framework and external imports */
import {Post, HttpCode, 
        Controller,
        UseGuards,
        Body, Req, Headers
        } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express'; 

/* DTOs */
import { LoginDTO, JWTLoginResponseDTO, JWTSimpleLoginResponseDTO, RefreshTokenDto, AccessTokenReponse } from 'src/application/dtos/auth/auth.dto';
import { ProjectKeyGuard } from 'src/application/guard/auth.login.middleware';

/* Services */
import { AuthServiceJWT } from 'src/application/services/auth/auth.jwt.service';
import { SimpleDeviceAuthJWT } from 'src/application/services/auth/simple.device.login.service';

@ApiTags('auth')
@Controller("auth")
export class JWTAuthController {
  constructor(
    private authService: AuthServiceJWT,
    private authServiceSimpleDevice: SimpleDeviceAuthJWT
  ) {}


  /** [POST METHOD] Login
   * 
   * @param dtoBody 
   * @param projectKey
   * @returns Promise<JWTSimpleLoginResponseDTO>
   */

  @Post("jwt/basic/login/")
  @UseGuards(new ProjectKeyGuard())
  @HttpCode(200)
  async login(
    @Body() dtoBody: LoginDTO,
    @Req() req: Request
  ): Promise<JWTSimpleLoginResponseDTO>
  {
    const projectKey = req.projectKey;
    const result = await this.authService.simpleLogin(
        {
          email: dtoBody.email,
          password:dtoBody.password,
          projectKey:projectKey
        }
      )
    return result;
  }

  @Post("jwt/simple-device/login/")
  @UseGuards(new ProjectKeyGuard())
  @HttpCode(200)
  async loginSimpleDevice(
    @Body() dtoBody: LoginDTO,
    @Req() req: Request,
    @Headers("device-id") deviceDto: string
  ): Promise<JWTLoginResponseDTO>
  {
    const projectKey = req.projectKey;
    const result = await this.authServiceSimpleDevice.login(
        {
          email: dtoBody.email,
          password:dtoBody.password,
          projectKey:projectKey
        },
        deviceDto
      )
    return {
      refreshToken: result.refreshToken,
      accessToken: result.accessToken,
      accessTokenExpiresIn: result.accessTokenExpiresIn,
      refreshTokenExpiresIn: result.refreshTokenExpiresIn,
      tokenType: result.tokenType,
      userId: result.userId
    }
  }


  
  @Post("jwt/simple-device/refresh-token/")
  @HttpCode(200)
  async generateRefreshSimpleDevice(
    @Body() dtoBody: RefreshTokenDto,
    @Headers("device-id") deviceDto: string
  ): Promise<AccessTokenReponse>
  {
    const result = await this.authServiceSimpleDevice.generateAccessToken(
      dtoBody,
      deviceDto)
    return result;
  }

}
