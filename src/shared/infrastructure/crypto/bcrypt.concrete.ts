import * as bcrypt from 'bcryptjs';
import { EncryptService } from 'src/shared/interfaces/crypto/crypto.abstract';

export class BcryptEncryptService extends EncryptService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, this.saltRounds);
    } catch(err) {
      return super.hash(password);
    }
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    try {
       return bcrypt.compare(password, hashed);
    } catch(err)
    {
      return super.compare(password, hashed);
    }
  }
}