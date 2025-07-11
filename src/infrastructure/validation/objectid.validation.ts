import { isValidObjectId } from "mongoose";
import { ID } from "src/domain/interface/user.repository";
import { IdValidator } from "src/domain/interface/validation.interface";


export class MongooseIdValidation implements IdValidator
{
    isValidId(id: ID): boolean {
        return isValidObjectId(id);
    }
}