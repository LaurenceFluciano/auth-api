import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/user.auth.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/application/controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CryptoModule } from 'src/infrastructure/utils/crypto.module';

@Module({
  imports: [
    UserModule,
    CryptoModule,
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_TOKEN_JWT'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') || '1h' },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
