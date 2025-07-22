
/* Entity Schemas */
import { UserEntity } from "src/domain/entities/user.entities";
import { UserMongoose, UserDocument } from "../schema/user.schema.mongodb";

/* Repository */
import { UserUpdateRepository, ID } from "./test/user.repo.basic.test.kit";

/* Mappers */
import { UserIDMapper, UserSimpleMapper } from "../mapper/user.simple.mapper.mongoose";

/* External */
import { Model } from "mongoose";
import { Injectable, Scope } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SimpleMapper } from "src/domain/ports/mapper.interface";
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

    async addScopes(id: ID, scopes: string[]): Promise<UserEntity<ID> | null> {
        const persistenceId = this.idMapper.toPersistence(id);

        scopes.forEach(scope => {
            if(scope.includes(":"))
            {
                throw new Error("Update Scopes have just one responsibility, create new scopes!")
            }
        })

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

    async addScopedPermissions(id: ID, name: string[], permissions: string, options?: {}): Promise<UserEntity<ID>> {
        if(options !== undefined)
        {
            throw new Error("This method don't have options yet")
        }
        
        if(permissions.trim().length < 1)
        {
            throw new Error("Impossible to add permisions when it don't have permisions.")
        }

        if(name.length < 1)
        {
            throw new Error("Impossible to add permisions when it don't have any scope.")
        }

        const toPersistenceID = this.idMapper.toPersistence(id);
        const userScopes = (await this.userModel.findById(toPersistenceID))?.scopes;

        if(userScopes === undefined)
        {
            throw new Error("User don't have any scope to add permissions")
        }

        const newScopes = userScopes.map(scope => {
            const splitedScope = scope.split(":");
            const fixedValue = splitedScope.length === 2 ? splitedScope[1] : scope;

            if(name.includes(fixedValue))
            {
                return `${permissions}:${fixedValue}`;
            } else
            {
                return scope;
            }
        })

        const updatedUserScopes = await this.userModel.findOneAndUpdate(
            {_id: toPersistenceID},
            {$set: { scopes: newScopes} },
            {new: true}
        )

        if (updatedUserScopes === null)
        {
            throw new Error("It can't be updated")
        }

        const domainUpdated = this.simpleMapper.toDomain(updatedUserScopes);
        return domainUpdated;
    }

    async updateStatus(id: ID, status: boolean): Promise<UserEntity<ID> | null> {
        const persistenceId = this.idMapper.toPersistence(id);

        if (status === undefined)
        {
            throw new Error("Status must to be a bool!")
        }

        const persitenceUpdated = await this.userModel.findOneAndUpdate(
            {_id: persistenceId},
            {$set: { active: status}},
            {new: true}
        )


        if(!persitenceUpdated)
        {
            return  null;
        }

        const domainUpdated = this.simpleMapper.toDomain(persitenceUpdated)
        return domainUpdated;
    }

    async updateUsername(id: ID, name: string): Promise<UserEntity<ID> | null> {
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

    async updatePassword(id: ID, password: string, options?: {}): Promise<void | null> {
            const persistenceId = this.idMapper.toPersistence(id);

            if(password === undefined || password === null)
            {
                throw new Error("Password must to be a string!")
            }

            const persistenceUpdated = await this.userModel.findOneAndUpdate(
                {_id: persistenceId},
                {password: password},
                {new: true}
            )

            if(!persistenceUpdated)
            {
                return null;
            }
    }

}