import { Module } from '@nestjs/common';
import { CACHE_TOKEN } from 'src/domain/ports/cache/cache.token';
import { NodeCacheService } from './node.cache';

@Module({
  providers: [
    {
      provide: CACHE_TOKEN,
      useClass: NodeCacheService,
    },
  ],
  exports: [CACHE_TOKEN],
})
export class CacheModule {}
