import mongoose, { Document } from 'mongoose';
import { collections } from 'src/templates/global/config/config.collections.mongodb';
import { TUserDto } from 'src/context/user/domain/entities/type.user';

export interface IUserMongo extends Omit<TUserDto, 'id'> {
  _id?: mongoose.Types.ObjectId;
}

const mongoUserSchema = new mongoose.Schema<IUserMongo>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    projectKey: { type: String, required: true },
    scopes: { type: [String], default: [] },
  },
  {
    timestamps: true,
  },
);

mongoUserSchema.index({ email: 1, projectKey: 1 }, { unique: true });

export const MongoUserModel = mongoose.model<IUserMongo>(
  collections['user'],
  mongoUserSchema,
);
