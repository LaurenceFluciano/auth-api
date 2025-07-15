import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthServiceJWT } from './services/auth/auth.strategy.jwt.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/application/controllers/jwt.auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
