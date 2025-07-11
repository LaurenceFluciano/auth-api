import * as bcrypt from 'bcryptjs';
import { EncryptService } from './crypto.abstract';

export class BcryptEncryptService implements EncryptService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}