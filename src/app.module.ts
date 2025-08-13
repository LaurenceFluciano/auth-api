import 'dotenv/config'; 
import { Module } from '@nestjs/common';
import { MongooseDatabaseConnection } from './infrastructure/mongodb/modules/mongoose.connection.module';
import { MongooseSchemaModule } from './infrastructure/mongodb/modules/mongoose.schema.module';
import { UserModule } from './application/user.module';
import { JWTAuthModule } from './application/auth.jwt.module';
import { CryptoModule } from './infrastructure/crypto/crypto.module';
import { ApplicationGuard } from './application/guard/application.guard';

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
