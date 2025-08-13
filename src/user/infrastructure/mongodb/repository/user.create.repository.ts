/* Entity Schemas */
import { UserEntity } from "src/user/domain/entities/user.entities";
import { UserMongoose, UserDocument } from "../schema/user.schema.mongodb";

/* Repository */
import { ID, UserCreatorRepository } from "src/user/domain/interfaces/user.repository";

/* Mappers */
import { UserSimpleMapper } from "../mapper/user.simple.mapper.mongoose";

/* External */
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SimpleMapper } from "src/shared/interfaces/mapper.interface";


@Injectable()
export class CreateUserMongoDBRepository 
implements UserCreatorRepository
{
    private simpleMapper: SimpleMapper<UserEntity<ID>, Partial<UserMongoose> | UserDocument>
    = new UserSimpleMapper()

    constructor(
        @InjectModel(UserMongoose.name)
        private userModel: Model<UserDocument>
    )
    {}

    async create(entity: UserEntity<ID>, options?: {ignorePassword: false}): Promise<ID> {
        const doc= this.simpleMapper.toPersistence(entity, {
            ignoreId: true, 
            ignorePassword: options?.ignorePassword});

        const taskInstance = new this.userModel(doc);
        const result = await taskInstance.save()
        
        return result._id.toString()
    }
}