import { Module } from "@nestjs/common";
import { UserMongoose, UserSchema } from "../user/infrastructure/mongodb/schema/user.schema.mongodb";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserMongoose.name, schema: UserSchema }]),
    ],
    exports: [
         MongooseModule 
    ]
})
export class MongooseSchemaModule {}
