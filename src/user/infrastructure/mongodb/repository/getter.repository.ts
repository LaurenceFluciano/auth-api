
/* Entity Schemas */
import { UserMongoose, UserDocument } from "../schema/user.schema.mongodb";
import { UserDTO } from "src/user/domain/dtos/user.entity.dto";

/* Repository */
import { UserGetterRepsitory } from "src/user/domain/interface/repository";

/* Mappers */
import { UserIDMapper, UserSimpleMapper } from "../mapper/simple.mapper.mongoose";

/* External */
import { Id } from "src/utils/interface/id/abstract.id";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SimpleMapper } from "src/utils/interface/mapper.interface";
import { Types } from "mongoose";

@Injectable()
export class GetUserMongoDBRepository 
implements UserGetterRepsitory
{
    private simpleMapper: SimpleMapper<UserDTO, Partial<UserMongoose> | UserDocument>
    = new UserSimpleMapper()
    private idMapper: SimpleMapper<Id, Types.ObjectId>
    = new UserIDMapper()


    constructor(
        @InjectModel(UserMongoose.name)
        private userModel: Model<UserDocument>
    )
    {}

    async getUserById(id: Id, options?: {ignorePassword: false} ): Promise<UserDTO | null> {
        const persistenceId = this.idMapper.toPersistence(id);

        const userPersistence = await this.userModel.findById(persistenceId);

        if(!userPersistence)
            return null;

        return this.simpleMapper.toDomain(userPersistence, {ignorePassword: options?.ignorePassword});
    }
    async getUserByCredential(email: string, projectKey: string, options?: {ignorePassword: false}): 
    Promise<UserDTO | null> {
        const result = await this.userModel.findOne({ email: email, projectKey: projectKey });
        
        if(!result)
        {
            return null;
        }

        return this.simpleMapper.toDomain(result, {ignorePassword: options?.ignorePassword});
    }

    async getUserByScopeAndName(
        scopes: string[], 
        name: string, 
        options?: {
            ignorePassword: false
        }): Promise<UserDTO[] | null> 
    {
        const results = await this.userModel.find({
            scopes:  { $in: scopes } ,
            name: name
        })
        
        return results.map(result => this.simpleMapper.toDomain(result, {ignorePassword: options?.ignorePassword}))
    }
}