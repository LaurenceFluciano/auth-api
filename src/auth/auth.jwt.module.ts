/* Framework */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

/* Services, Modules and controllers */
import { AuthService } from './application/service/auth.service';
import { AuthServiceJWT } from './application/service/jwt.service';
import { UserModule } from 'src/user/user.module';
import { JWTAuthController } from 'src/auth/jwt.auth.controller';
import { AuthCacheModule } from 'src/cache/infrastructure/cache.auth.module';
import { SimpleDeviceAuthJWT } from './application/service/simple.device.service';
import { GenerateIdModule } from 'src/utils/infrastructure/id/id.generate.module';

@Module({
  imports: [
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
  providers: [AuthService, AuthServiceJWT],
  controllers: [JWTAuthController],
  exports: [AuthServiceJWT],
})
export class JWTAuthModule {}
