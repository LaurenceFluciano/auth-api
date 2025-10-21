import { ICentralId } from 'src/templates/context/domain/id';
import { v4 as uuidv4 } from 'uuid';

export class UserId implements ICentralId {
  generateId(): Id {
    return uuidv4();
  }
}
