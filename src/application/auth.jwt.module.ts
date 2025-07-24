/* Framework */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

/* Services, Modules and controllers */
import { AuthService } from './services/auth/auth.service';
import { AuthServiceJWT } from './services/auth/auth.jwt.service';
import { UserModule } from './user.module';
import { AuthController } from 'src/interface/http/controllers/jwt.auth.controller';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_TOKEN_JWT'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') || '1h' },
      }),
    }),
  ],
  providers: [AuthService, AuthServiceJWT],
  controllers: [AuthController],
  exports: [AuthServiceJWT],
})
export class AuthModule {}
