import { IAuthRepository } from 'src/context/auth/domain/ports/auth.repository';
import { injectable } from 'tsyringe';
import { MongoUserAuthModel } from '../schema/auth.schema';
import {
  FactorMethod,
  TFactors,
} from 'src/context/auth/domain/entities/type.factor';

@injectable()
export class AuthRepositoryMongo implements IAuthRepository {
  async setFactorMethod(
    userId: Id,
    factor: TFactors,
    factorMethod: FactorMethod,
  ): Promise<boolean> {
    const user = await MongoUserAuthModel.findOne({ userId });

    if (!user) {
      const newUser = new MongoUserAuthModel({
        userId,
        factors: { [factor]: [factorMethod] },
      });
      await newUser.save();
      return true;
    }

    if (!user.factors[factor]) {
      user.factors[factor] = [];
    }

    const idx = user.factors[factor].findIndex(
      (m) => m.type === factorMethod.type,
    );

    if (idx !== -1) {
      user.factors[factor][idx] = factorMethod;
    } else {
      user.factors[factor].push(factorMethod);
    }

    await user.save();

    return true;
  }

  async getFactorMethod(
    userId: Id,
    factor: TFactors,
    type: string,
  ): Promise<FactorMethod | null> {
    const user = await MongoUserAuthModel.findOne(
      {
        userId,
        [`factors.${factor}`]: { $elemMatch: { type } },
      },
      {
        [`factors.${factor}.$`]: 1,
      },
    );

    if (!user || !user.factors[factor]) return null;

    return user.factors[factor][0] || null;
  }
}
