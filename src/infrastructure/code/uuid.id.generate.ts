import { v4 as uuid4 } from "uuid";
import { IdGenerator } from "src/domain/ports/code/id.generate";

export class UuidGenerator implements IdGenerator
{
    async generateId(): Promise<string> {
        return uuid4();
    }
}