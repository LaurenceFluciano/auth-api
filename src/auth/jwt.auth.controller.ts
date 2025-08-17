/* Framework and external imports */
import {Post, HttpCode, 
        Controller,
        UseGuards,
        Body, Req, Headers,
        HttpStatus,
        Get
        } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express'; 

/* DTOs */
import { LoginDTO } from 'src/auth/application/dtos/auth.dto';
import { JWTResponse, RefreshTokenRequest, AccessTokenReponse } from 'src/auth/application/dtos/jwt.dto';

/* GUARDS */
import { ProjectKeyGuard } from 'src/guard/auth.login.guard';
import { SimpleDeviceLoginProfileGuard } from 'src/guard/profile.jwt.guard';

/* Services */
import { AuthServiceJWT } from 'src/auth/application/service/jwt.service';
import { SimpleDeviceAuthJWT } from 'src/auth/application/service/simple.device.service';


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
  ): Promise<Partial<JWTResponse>>
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
  ): Promise<Partial<JWTResponse>>
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
    return result
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


  @Get("jwt/simple-device/me/")
  @UseGuards(SimpleDeviceLoginProfileGuard)
  @HttpCode(HttpStatus.OK)
  async profile(
    @Req() req: Request
  )
  {
    const user = req.user;
    return user;
  } 

}
