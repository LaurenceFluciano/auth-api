import { Module } from '@nestjs/common';
import { USER_VALIDATION } from 'src/domain/ports/validations.ports';
import { ExternalUserValidation } from './user.external.validation';

@Module({
  providers: [
    {
      provide: USER_VALIDATION,
      useClass: ExternalUserValidation,
    },
  ],
  exports: [USER_VALIDATION],
})
export class UserValidationModule {}
