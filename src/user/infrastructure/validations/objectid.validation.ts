import { isValidObjectId } from "mongoose";
import { ID } from "src/user/domain/interfaces/user.repository"
import { IdValidator } from "src/user/domain/validations/validation";


export class MongooseIdValidation implements IdValidator
{
    isValidId(id: ID): boolean {
        return isValidObjectId(id);
    }
}