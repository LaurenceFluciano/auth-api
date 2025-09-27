import { Module } from '@nestjs/common';
import { UuidGenerator } from './uuid.id.generate';
import { ID_GENERATE } from 'src/utils/interface/id/id.generate.token';

@Module({
  providers: [
    {
      provide: ID_GENERATE,
      useClass: UuidGenerator,
    },
  ],
  exports: [ID_GENERATE],
})
export class GenerateIdModule {}
