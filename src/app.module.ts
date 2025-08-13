import 'dotenv/config'; 
import { Module } from '@nestjs/common';
import { MongooseDatabaseConnection } from './config/mongoose.connection.module';
import { MongooseSchemaModule } from './config/mongoose.schema.module';
import { UserModule } from './user/user.module';
import { JWTAuthModule } from './auth/auth.jwt.module';
import { CryptoModule } from './shared/infrastructure/crypto/crypto.module';
import { ApplicationGuard } from './guard/application.guard';

@Module({
  imports: [
    MongooseDatabaseConnection,
    MongooseSchemaModule,
    CryptoModule,
    UserModule,
    JWTAuthModule
  ],
  providers: [ApplicationGuard]
})

export class AppModule {}
