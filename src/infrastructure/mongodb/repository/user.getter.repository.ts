
/* Entity Schemas */
import { UserEntity } from "src/domain/entities/user.entities";
import { UserMongoose, UserDocument } from "../schema/user.schema.mongodb";

/* Repository */
import { ID, UserGetterRepsitory } from "./test/user.repo.basic.test.kit";

/* Mappers */
import { UserIDMapper, UserSimpleMapper } from "../mapper/user.simple.mapper.mongoose";

/* External */
import { Model } from "mongoose";
import { Injectable, Options } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SimpleMapper } from "src/domain/ports/mapper.interface";
import { Types } from "mongoose";

@Injectable()
export class GetUserMongoDBRepository 
implements UserGetterRepsitory
{
    private simpleMapper: SimpleMapper<UserEntity<ID>, Partial<UserMongoose> | UserDocument>
    = new UserSimpleMapper()
    private idMapper: SimpleMapper<ID, Types.ObjectId>
    = new UserIDMapper()


    constructor(
        @InjectModel(UserMongoose.name)
        private userModel: Model<UserDocument>
    )
    {}

    async getUserById(id: ID, options?: {ignorePassword: false} ): Promise<UserEntity<ID> | null> {
        const persistenceId = this.idMapper.toPersistence(id);

        const userPersistence = await this.userModel.findById(persistenceId);

        if(!userPersistence)
        {
            return null;
        }

        return this.simpleMapper.toDomain(userPersistence, {ignorePassword: options?.ignorePassword});
    }
    async getUserByCredential(email: string, projectKey: string, options?: {ignorePassword: false}): 
    Promise<UserEntity<ID> | null> {
        const result = await this.userModel.findOne({ email: email, projectKey: projectKey });
        
        if(!result)
        {
            return null;
        }

        console.log(result)

        return this.simpleMapper.toDomain(result, {ignorePassword: options?.ignorePassword});
    }
}