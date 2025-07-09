import { Module } from '@nestjs/common';
import { MongooseDatabaseConnection } from './infrastructure/mongodb/modules/mongoose.connection.module';
import { MongooseSchemaModule } from './infrastructure/mongodb/modules/mongoose.schema.module';


@Module({
  imports: [
    MongooseDatabaseConnection,
    MongooseSchemaModule
  ],
})

export class AppModule {}
