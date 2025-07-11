import { Module } from '@nestjs/common';
import { MongooseDatabaseConnection } from './infrastructure/mongodb/modules/mongoose.connection.module';
import { MongooseSchemaModule } from './infrastructure/mongodb/modules/mongoose.schema.module';
import { UserModule } from './application/user.module';

@Module({
  imports: [
    MongooseDatabaseConnection,
    MongooseSchemaModule,
    UserModule
  ],
})

export class AppModule {}
