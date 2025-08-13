/* Framework */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

/* Services, Modules and controllers */
import { AuthService } from './service/auth.service';
import { AuthServiceJWT } from './service/jwt.service';
import { UserModule } from 'src/user/user.module';
import { JWTAuthController } from 'src/auth/jwt.auth.controller';
import { AuthCacheModule } from 'src/cache/infrastructure/cache.auth.module';
import { SimpleDeviceAuthJWT } from './service/simple.device.service';
import { GenerateIdModule } from 'src/shared/infrastructure/code/id.generate.module';

@Module({
  imports: [
    AuthCacheModule,
    GenerateIdModule,
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_TOKEN_JWT'),
      }),
    }),
  ],
  providers: [AuthService, AuthServiceJWT, SimpleDeviceAuthJWT],
  controllers: [JWTAuthController],
  exports: [AuthServiceJWT,SimpleDeviceAuthJWT],
})
export class JWTAuthModule {}
