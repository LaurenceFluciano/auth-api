import NodeCache from 'node-cache';
import { CacheStrategyService } from 'src/cache/domain/interface/cache.strategy';

export class NodeCacheService<Input, Output> implements CacheStrategyService<Input, Output> {
  private cache: NodeCache;

  async init(options: { ttlSeconds?: number } = {}) {
    const ttl = options.ttlSeconds ?? 900;
    this.cache = new NodeCache({ stdTTL: ttl });
  }

  async set(key: string, data: Input, expireIn: number = 900):  Promise<boolean> {
    const result = this.cache.set(key, data);
    if(result) this.cache.ttl(key, expireIn)
    return Promise.resolve(result)
  }

  async get(key: string): Promise<Output | undefined> {
    return Promise.resolve(this.cache.get(key)) as Output | undefined;
  }

  async del(keys: string[]):  Promise<boolean> {
    if(this.cache.del([...keys]) >= 1)
    {
      return true;
    }
    return Promise.resolve(false);
  }
}
