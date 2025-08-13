import { Module } from '@nestjs/common';
import { GenerateCode } from 'src/shared/infrastructure/code/recovery.code.generate';
import { GENERATE_CODE_STRATEGY } from 'src/shared/interface/code/recovery.code.token';

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
