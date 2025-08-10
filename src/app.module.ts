import 'dotenv/config'; 
import { Module } from '@nestjs/common';
import { MongooseDatabaseConnection } from './infrastructure/mongodb/modules/mongoose.connection.module';
import { MongooseSchemaModule } from './infrastructure/mongodb/modules/mongoose.schema.module';
import { UserModule } from './application/user.module';
import { JWTAuthModule } from './application/auth.jwt.module';
import { CryptoModule } from './infrastructure/crypto/crypto.module';

@Module({
  imports: [
    MongooseDatabaseConnection,
    MongooseSchemaModule,
    CryptoModule,
    UserModule,
    JWTAuthModule
  ],
})

export class AppModule {}
