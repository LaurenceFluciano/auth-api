import { Module } from '@nestjs/common';
import { GenerateCode } from 'src/domain/util/recovery.code.generation';
import { GENERATE_CODE_STRATEGY } from 'src/domain/ports/code/recovery.code.token';

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
