import { TUserDto } from 'src/context/user/domain/entities/type.user';
import { IMapper } from 'src/templates/global/mapper/mapper.interface';
import { IUserMongo } from '../schema/user.schema.mongodb';
import mongoose from 'mongoose';

export class UserMapperEntityMongo implements IMapper<TUserDto, IUserMongo> {
  toDomain(schema: IUserMongo): TUserDto {
    return {
      email: schema.email,
      name: schema.name,
      projectKey: schema.projectKey,
      id: schema._id === undefined ? undefined : schema._id.toString(),
      scopes: schema.scopes,
    } as TUserDto;
  }
  toModel(entity: TUserDto): IUserMongo {
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

export class UserMapperIdMongo implements IMapper<Id, mongoose.Types.ObjectId> {
  toDomain(schema: mongoose.Types.ObjectId): Id {
    return schema.toString();
  }
  toModel(entity: Id): mongoose.Types.ObjectId {
    const id = entity.toString();
    return new mongoose.Types.ObjectId(id);
  }
}
