/* Framework and external imports */
import {Post, HttpCode, 
        Controller,
        UseGuards,
        Body, Req, Headers,
        HttpStatus
        } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express'; 

/* DTOs */
import { LoginDTO, RefreshTokenRequest, AccessTokenReponse } from 'src/auth/dto/auth.dto';
import { JWTLoginResponse, JWTSimpleLoginResponse } from 'src/auth/dto/jwt.dto';

/* GUARDS */
import { ProjectKeyGuard } from 'src/guard/auth.login.guard';
import { ApplicationGuard } from 'src/guard/application.guard';

/* Services */
import { AuthServiceJWT } from 'src/auth/service/jwt.service';
import { SimpleDeviceAuthJWT } from 'src/auth/service/simple.device.service';


@ApiTags('auth')
@Controller("v1/auth")
export class JWTAuthController {
  constructor(
    private authService: AuthServiceJWT,
    private authServiceSimpleDevice: SimpleDeviceAuthJWT
  ) {}


  /** [POST METHOD] Login
   * 
   * @param dtoBody 
   * @param projectKey
   * @returns Promise<JWTSimpleLoginResponse>
   */

  @Post("jwt/basic/login/")
  @UseGuards(ProjectKeyGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dtoBody: LoginDTO,
    @Req() req: Request
  ): Promise<JWTSimpleLoginResponse>
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

  /** [POST METHOD] Login with device
   * 
   * @param dtoBody 
   * @param req 
   * @param deviceDto 
   * @returns JWTLoginResponseDTO
   */

  @Post("jwt/simple-device/login/")
  @UseGuards(ProjectKeyGuard)
  @HttpCode(HttpStatus.OK)
  async loginSimpleDevice(
    @Body() dtoBody: LoginDTO,
    @Req() req: Request,
    @Headers("device-id") deviceDto: string
  ): Promise<JWTLoginResponse>
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

  /**
   * 
   * @param dtoBody 
   * @param deviceDto 
   * @returns AccessTokenReponse
   */

  
  @Post("jwt/simple-device/refresh-token/")
  @HttpCode(HttpStatus.CREATED)
  async generateRefreshSimpleDevice(
    @Body() dtoBody: RefreshTokenRequest,
    @Headers("device-id") deviceDto: string
  ): Promise<AccessTokenReponse>
  {
    const result = await this.authServiceSimpleDevice.generateAccessToken(
      dtoBody,
      deviceDto)
    return result;
  }

}
