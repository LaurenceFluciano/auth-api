import { TUserDto } from 'src/context/user/domain/entities/type.user';
import { IUserRepository } from 'src/context/user/domain/ports/user.repository';
import { TOffsetPagination } from 'src/templates/global/types/base.pagination';
import { IUserMongo, MongoUserModel } from '../schema/user.schema.mongodb';
import {
  UserMapperEntityMongo,
  UserMapperIdMongo,
} from '../mapper/mongo.mapper';
import { HydratedDocument } from 'mongoose';
import { injectable } from 'tsyringe';

@injectable()
export class UserRepositoryMongo implements IUserRepository {
  private mapper: UserMapperEntityMongo = new UserMapperEntityMongo();
  private mapperId: UserMapperIdMongo = new UserMapperIdMongo();

  async add(input: TUserDto): Promise<Id | null> {
    const documentInput = this.mapper.toSchema(input);
    const user: HydratedDocument<IUserMongo> = new MongoUserModel(
      documentInput,
    );
    await user.save();
    return this.mapperId.toPersistence(user._id);
  }

  async findAll(pagination: TOffsetPagination): Promise<TUserDto[]> {
    const users: HydratedDocument<IUserMongo>[] = await MongoUserModel.find({})
      .skip(pagination.offset.get())
      .limit(pagination.limit.get());
    return users.map((user) => this.mapper.toPersistence(user));
  }

  async findById(id: Id): Promise<TUserDto | null> {
    const user: HydratedDocument<IUserMongo> | null =
      await MongoUserModel.findById(id);
    if (!user) return null;
    return this.mapper.toPersistence(user);
  }

  async findByCredential(
    email: string,
    projectKey: string,
  ): Promise<TUserDto | null> {
    const user: HydratedDocument<IUserMongo> | null =
      await MongoUserModel.findOne({
        email: email,
        projectKey: projectKey,
      });
    if (!user) return null;
    return this.mapper.toPersistence(user);
  }
}
