import { UserPersistence } from 'src/context/user-auth/domain/entities/type.user';
import { IUserRepository } from 'src/context/user-auth/domain/ports/user.repository';
import { TOffsetPagination } from 'src/templates/types/base.pagination';
import { IUserMongo, MongoUserModel } from '../schema/user.schema.mongodb';
import { HydratedDocument } from 'mongoose';
import { injectable } from 'tsyringe';
import { User } from 'src/context/user-auth/domain/entities/user';

@injectable()
export class UserRepositoryMongo implements IUserRepository {
  async add(input: User): Promise<Id | null> {
    const persistence = input.toPersistence();
    const user: HydratedDocument<IUserMongo> = new MongoUserModel({
      _id: persistence.id,
      ...persistence,
    });
    await user.save();
    return user._id;
  }

  async saveChanges(
    id: Id,
    changes: Partial<Omit<UserPersistence, 'id'>>,
  ): Promise<Partial<UserPersistence> | null> {
    const updated = await MongoUserModel.findOneAndUpdate(
      { _id: id },
      { $set: changes },
    ).lean<IUserMongo>();
    if (!updated) return null;
    return this.toPersistenceUser(updated);
  }

  async findAll(pagination: TOffsetPagination): Promise<UserPersistence[]> {
    const users = await MongoUserModel.find({})
      .skip(pagination.offset)
      .limit(pagination.limit)
      .lean<IUserMongo[]>();
    return this.toPersistenceUsers(users);
  }

  async findById(id: Id): Promise<UserPersistence | null> {
    const user = await MongoUserModel.findById(id).lean<IUserMongo>();
    if (!user) return null;
    return this.toPersistenceUser(user);
  }

  async findByCredential(
    email: string,
    projectKey: string,
  ): Promise<UserPersistence | null> {
    const user = await MongoUserModel.findOne({
      email: email,
      projectKey: projectKey,
    }).lean<IUserMongo>();
    if (!user) return null;
    return this.toPersistenceUser(user);
  }

  async findManyByIds(ids: Id[]): Promise<UserPersistence[]> {
    const users = await MongoUserModel.find({
      _id: { $in: ids },
    }).lean<IUserMongo[]>();
    return this.toPersistenceUsers(users);
  }

  private toPersistenceUsers(users: IUserMongo[]): UserPersistence[] {
    return users.map((u) => ({
      id: u._id,
      name: u.name,
      email: u.email,
      scopes: u.scopes,
      auths: u.auths,
      projectKey: u.projectKey,
    }));
  }

  private toPersistenceUser(user: IUserMongo): UserPersistence {
    return { ...user, id: user._id };
  }
}
