import { Module } from '@nestjs/common';
import { EncryptService } from './crypto.abstract';
import { BcryptEncryptService } from './bcrypt.service';

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
