/* Entity Schemas */
import { UserMongoose, UserDocument } from "../schema/user.schema.mongodb";
import { UserDTO } from "src/user/domain/dtos/user.entity.dto";

/* Repository */
import { UserCreatorRepository } from "src/user/domain/interface/repository";

/* Mappers */
import { UserSimpleMapper } from "../mapper/simple.mapper.mongoose";

/* External */
import { Id } from "src/utils/interface/id/abstract.id";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SimpleMapper } from "src/utils/interface/mapper.interface";



@Injectable()
export class CreateUserMongoDBRepository 
implements UserCreatorRepository
{
    private simpleMapper: SimpleMapper<UserDTO, Partial<UserMongoose> | UserDocument>
    = new UserSimpleMapper()

    constructor(
        @InjectModel(UserMongoose.name)
        private userModel: Model<UserDocument>
    )
    {}

    async create(entity: UserDTO, options?: {ignorePassword: false}): Promise<Id> {
        const doc= this.simpleMapper.toPersistence(entity, {
            ignoreId: true, 
            ignorePassword: options?.ignorePassword});

        const taskInstance = new this.userModel(doc);
        const result = await taskInstance.save()
        
        return result._id.toString()
    }
}