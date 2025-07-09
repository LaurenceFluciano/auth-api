import { UserEntity } from "src/domain/entities/user.entities";
import { SimpleMapper } from "src/domain/interface/mapper.interface";
import { UserDocument, UserMongoose } from "../schema/user.schema.mongodb";
import { Types } from "mongoose";
import { ID } from "src/domain/interface/user.repository";

export class UserSimpleMapper 
implements SimpleMapper<UserEntity<ID>, UserDocument | Partial<UserMongoose>>
{
    toDomain(
        external: UserDocument, 
        options?: {
            ignoreId?: boolean, 
            ignorePassword?: boolean,
            ignoreTimeStamp?: boolean
        }): UserEntity<ID> {
            const entity = {
                name: external.name,
                projectKey: external.projectKey,
                email: external.email,
                scopes: external.scopes,
                active: external.active,
            } as UserEntity<ID>

            if(options?.ignoreId && external._id)
            {
                entity.id = external._id.toString()
            }

            if(options?.ignorePassword && external.password)
            {  
                entity.password = external.password
            }

            if(options?.ignoreTimeStamp && external.createdAt && external.updatedAt)
            {
                entity.createdAt = new Date(external.createdAt)
                entity.updatedAt = new Date(external.updatedAt)
            }

            return entity
    }

    toPersistence(
        entity: UserEntity<ID>, 
        options?: 
        {
            ignoreId?: boolean, 
            ignorePassword?: boolean 
        }): Partial<UserMongoose> & UserDocument
    {
        if (
            !entity.name ||
            !entity.email ||
            entity.scopes.length <= 0 ||
            !entity.projectKey ||
            entity.active === undefined
        ) {
            throw new Error("[SIMPLE MAPPER] Campos obrigatórios para persistência faltando.")
        }

        const doc = {
            name: entity.name,
            email: entity.email,
            active: entity.active,
            scopes: entity.scopes,
            projectKey: entity.projectKey
        } as Partial<UserMongoose>  & UserDocument

        if (!options?.ignoreId && entity.id) 
        {
            doc._id = new Types.ObjectId(entity.id);
        }

        if(!options?.ignorePassword && entity.password) 
        {
            doc.password = entity.password;
        }

        return doc
    }
} 