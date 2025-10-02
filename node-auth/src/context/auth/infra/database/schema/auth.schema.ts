import mongoose from 'mongoose';
import { collections } from 'src/templates/global/config/config.collections.mongodb';
import { TUserAuth } from 'src/context/auth/domain/entities/type.user.auth';
import { FactorMethod } from 'src/context/auth/domain/entities/type.factor';

const factorMethodSchema = new mongoose.Schema<FactorMethod>(
  {
    type: { type: String, required: true },
    secret: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const mongoAuthSchema = new mongoose.Schema<TUserAuth>(
  {
    userId: { type: String, required: true, unique: true },
    factors: {
      knowledge: { type: [factorMethodSchema], default: [] },
      possession: { type: [factorMethodSchema], default: [] },
      inherence: { type: [factorMethodSchema], default: [] },
      location: { type: [factorMethodSchema], default: [] },
      behavior: { type: [factorMethodSchema], default: [] },
    },
  },
  { timestamps: false, _id: false },
);

export const MongoUserAuthModel = mongoose.model<TUserAuth>(
  collections['auth'],
  mongoAuthSchema,
  collections['auth'],
);
