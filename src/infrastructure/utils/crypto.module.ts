import { Module, Global } from '@nestjs/common';
import { EncryptService } from './crypto.abstract';
import { BcryptEncryptService } from './bcrypt.service';

@Global()
@Module({
  providers: [
    {
      provide: EncryptService,
      useClass: BcryptEncryptService,
    },
  ],
  exports: [EncryptService],
})
export class CryptoModule {}
