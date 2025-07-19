import { Module } from '@nestjs/common';
import { CACHE_SERVICE } from 'src/domain/ports/cache.strategy';
import { NodeCacheService } from './node.cache.service';

@Module({
  providers: [
    {
      provide: CACHE_SERVICE,
      useClass: NodeCacheService,
    },
  ],
  exports: [CACHE_SERVICE],
})
export class CacheModule {}
