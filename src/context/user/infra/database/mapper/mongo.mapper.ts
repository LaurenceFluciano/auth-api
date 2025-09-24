import { TUserDto } from 'src/context/user/domain/entities/type.user';
import { IMapper } from 'src/templates/global/mapper/mapper.interface';
import { IUserMongo } from '../schema/user.schema.mongodb';
import mongoose from 'mongoose';

export class MongoUserMapperEntity implements IMapper<TUserDto, IUserMongo> {
  toPersistence(schema: IUserMongo): TUserDto {
    return {
      email: schema.email,
      name: schema.name,
      projectKey: schema.projectKey,
      id: schema._id === undefined ? undefined : schema._id.toString(),
      scopes: schema.scopes,
    } as TUserDto;
  }
  toSchema(entity: TUserDto): IUserMongo {
    const id = entity.id?.toString();
    return {
      email: entity.email,
      name: entity.name,
      projectKey: entity.projectKey,
      _id: new mongoose.Types.ObjectId(id),
      scopes: entity.scopes,
    } as IUserMongo;
  }
}

export class MongoUserMapperId implements IMapper<Id, mongoose.Types.ObjectId> {
  toPersistence(schema: mongoose.Types.ObjectId): Id {
    return schema.toString();
  }
  toSchema(entity: Id): mongoose.Types.ObjectId {
    const id = entity.toString();
    return new mongoose.Types.ObjectId(id);
  }
}
