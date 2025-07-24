import { isValidObjectId } from "mongoose";
import { ID } from "src/domain/ports/repositories/user.repository"
import { IdValidator } from "src/domain/ports/validations/validation";


export class MongooseIdValidation implements IdValidator
{
    isValidId(id: ID): boolean {
        return isValidObjectId(id);
    }
}