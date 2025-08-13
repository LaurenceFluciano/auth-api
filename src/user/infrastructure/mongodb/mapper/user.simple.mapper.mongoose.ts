import { UserEntity } from "src/user/domain/entities/user.entities";
import { SimpleMapper } from "src/shared/interfaces/mapper.interface";
import { UserDocument, UserMongoose } from "../schema/user.schema.mongodb";
import { isValidObjectId, Types } from "mongoose";
import { ID } from "../repository/test/user.repo.basic.test.kit";

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

            if(!options?.ignoreId && external._id)
            {
                entity.id = external._id.toString()
            }

            if(!options?.ignorePassword && external.password)
            {  
                entity.password = external.password
            }

            if(!options?.ignoreTimeStamp && external.createdAt && external.updatedAt)
            {
                entity.createdAt = new Date(external.createdAt)
                entity.updatedAt = new Date(external.updatedAt)
            }

            console.log(entity)

            return entity
    }

    toPersistence(
        domain: UserEntity<ID>, 
        options?: 
        {
            ignoreId?: boolean, 
            ignorePassword?: boolean 
        }): Partial<UserMongoose> & UserDocument
    {
        if (
            !domain.name ||
            !domain.email ||
            domain.scopes.length <= 0 ||
            !domain.projectKey ||
            domain.active === undefined
        ) {
            throw new Error("[SIMPLE MAPPER] Campos obrigatórios para persistência faltando.")
        }

        const doc = {
            name: domain.name,
            email: domain.email,
            active: domain.active,
            scopes: domain.scopes,
            projectKey: domain.projectKey
        } as Partial<UserMongoose>  & UserDocument

        if (!options?.ignoreId && domain.id) 
        {
            doc._id = new Types.ObjectId(domain.id);
        }

        if(!options?.ignorePassword && domain.password) 
        {
            doc.password = domain.password;
        }

        return doc
    }
} 

export class UserIDMapper
implements SimpleMapper<ID, Types.ObjectId>
{
    toDomain(external: Types.ObjectId): ID {
        return external.toString()
    }
    toPersistence(domain: string): Types.ObjectId {
        if(!isValidObjectId(domain))
        {
            throw new Error("[Simple Mapper] Id obtido é inválido");
        }
        return new Types.ObjectId(domain);
    }
}