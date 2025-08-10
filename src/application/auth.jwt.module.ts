/* Framework */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

/* Services, Modules and controllers */
import { AuthService } from './services/auth/auth.service';
import { AuthServiceJWT } from './services/auth/auth.jwt.service';
import { UserModule } from './user.module';
import { JWTAuthController } from 'src/http/controllers/jwt.auth.controller';
import { AuthCacheModule } from 'src/infrastructure/cache/cache.auth.module';
import { SimpleDeviceAuthJWT } from './services/auth/simple.device.login.service';
import { GenerateIdModule } from 'src/infrastructure/code/id.generate.module';

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
