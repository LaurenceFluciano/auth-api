import { v4 as uuid4 } from "uuid";
import { IdGenerator } from "src/utils/interface/id/id.generate";

export class UuidGenerator implements IdGenerator
{
    async generateId(): Promise<string> {
        return uuid4();
    }
}