import { isValidObjectId } from "mongoose";
import { Id } from "src/utils/interface/id/abstract.id";
import { IdValidator } from "src/utils/interface/id/abstract.id";

export class MongooseIdValidation implements IdValidator
{
    isValidId(id: Id): boolean {
        return isValidObjectId(id);
    }
}