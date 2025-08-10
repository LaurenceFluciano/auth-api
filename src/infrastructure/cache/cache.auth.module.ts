import { Module } from '@nestjs/common';
import { CACHE_AUTH_TOKEN } from 'src/domain/ports/cache/cache.token';
import { RedisCacheService } from './redis.cache.service';

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
