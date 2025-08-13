import { Module } from '@nestjs/common';
import { CACHE_AUTH_TOKEN } from 'src/cache/domain/interface/cache.token';
import { RedisCacheService } from './redis.cache';

@Module({
  providers: [
    {
      provide: CACHE_AUTH_TOKEN,
      useClass: RedisCacheService,
    },
  ],
  exports: [CACHE_AUTH_TOKEN],
})
export class AuthCacheModule {}
