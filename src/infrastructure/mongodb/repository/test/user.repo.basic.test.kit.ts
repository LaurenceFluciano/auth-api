
// External imports
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Model } from "mongoose";

// Schema manual
import { UserMongoose, UserSchema } from "../../schema/user.schema.mongodb";

// Domínio
import { ID, UserCreatorRepository, UserUpdateRepository, UserGetterRepsitory } from "../../../../domain/ports/repositories/user.repository";
import { UserEntity } from "../../../../domain/entities/user.entities";

// Factory para inicializar tudo
async function initMongoMemory() 
{
  const mongoServer = await MongoMemoryServer.create();
  const connection = await mongoose.connect(mongoServer.getUri());
  const userModel = connection.model(UserMongoose.name, UserSchema);

  return { mongoServer, connection, userModel };
}




export {
  MongoMemoryServer,
  mongoose,
  Model,
  UserMongoose,
  UserSchema,
  ID,
  UserCreatorRepository,
  UserEntity,
  initMongoMemory,
  UserUpdateRepository,
  UserGetterRepsitory
};
