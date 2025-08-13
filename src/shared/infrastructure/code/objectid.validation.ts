import { isValidObjectId } from "mongoose";
import { ID } from "src/user/domain/interface/repository"
import { IdValidator } from "src/user/domain/validation/validation";


export class MongooseIdValidation implements IdValidator
{
    isValidId(id: ID): boolean {
        return isValidObjectId(id);
    }
}