import { Module } from '@nestjs/common';
import { GenerateCode } from 'src/domain/recovery.code.generation';
import { GENERATE_CODE_STRATEGY } from 'src/domain/ports/recovery.code.strategy';

@Module({
  providers: [
    {
      provide: GENERATE_CODE_STRATEGY,
      useClass: GenerateCode,
    },
  ],
  exports: [GENERATE_CODE_STRATEGY],
})
export class GenerateCodeModule {}
