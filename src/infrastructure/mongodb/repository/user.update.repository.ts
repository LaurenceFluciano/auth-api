
/* Entity Schemas */
import { UserEntity } from "src/domain/entities/user.entities";
import { UserMongoose, UserDocument } from "../schema/user.schema.mongodb";

/* Repository */
import { ID, UserUpdateRepository} from "src/domain/interface/user.repository";

/* Mappers */
import { UserIDMapper, UserSimpleMapper } from "../mapper/user.simple.mapper.mongoose";

/* External */
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SimpleMapper } from "src/domain/interface/mapper.interface";
import { Types } from "mongoose";

@Injectable()
export class UpdateUserMongoDBRepository 
implements UserUpdateRepository
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

    async updateScopes(id: ID, scopes: string[]): Promise<UserEntity<ID>> {
        const persistenceId = this.idMapper.toPersistence(id);

        const persitenceUpdated = await this.userModel.findOneAndUpdate(
            { _id: persistenceId },
            { $addToSet: { scopes: { $each: scopes } } },
            {new: true}
        );
        
        if (!persitenceUpdated)
        {
            throw new Error("Not found id.")
        }

        const domainUpdated = this.simpleMapper.toDomain(persitenceUpdated);
        return domainUpdated;
    }

    async updateStatus(id: ID, status: boolean): Promise<UserEntity<ID>> {
        const persistenceId = this.idMapper.toPersistence(id);

        if (status === undefined)
        {
            throw new Error("Status must to be a bool!")
        }

        const persitenceUpdated = await this.userModel.findOneAndUpdate(
            {_id: persistenceId},
            {active: status},
            {new: true}
        )


        if(!persitenceUpdated)
        {
            throw new Error("Not found id.")
        }

        const domainUpdated = this.simpleMapper.toDomain(persitenceUpdated)
        return domainUpdated;
    }

    async updateUsername(id: ID, name: string): Promise<UserEntity<ID>> {
        const persistenceId = this.idMapper.toPersistence(id);

        if (name === undefined || name === null)
        {
            throw new Error("Username must to be a string!")
        }

        const persitenceUpdated = await this.userModel.findOneAndUpdate(
            {_id: persistenceId},
            {name: name},
            {new: true}
        )


        if(!persitenceUpdated)
        {
            throw new Error("Not found id.")
        }

        const domainUpdated = this.simpleMapper.toDomain(persitenceUpdated)
        return domainUpdated;
    }

}