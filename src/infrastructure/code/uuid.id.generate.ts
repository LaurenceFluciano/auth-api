import { v4 as uuid4 } from "uuid";
import { IdGenerator } from "src/domain/ports/code/id.generate";

export class UuidGenerator implements IdGenerator
{
    generateId(): string {
        return uuid4();
    }
}