import mongoose from 'mongoose';
import { collections } from 'src/templates/global/config/config.collections.mongodb';
import { UserPersistence } from 'src/context/user-auth/domain/entities/type.user';

export interface IUserMongo extends Omit<UserPersistence, 'id'> {
  _id: string;
}

const mongoUserSchema = new mongoose.Schema<IUserMongo>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    projectKey: { type: String, required: true },
    scopes: { type: [String], default: [] },
    auths: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  },
);

mongoUserSchema.index({ email: 1, projectKey: 1 }, { unique: true });

export const MongoUserModel = mongoose.model<IUserMongo>(
  collections['user'],
  mongoUserSchema,
  collections['user'],
);
