import NodeCache from 'node-cache';
import { CacheStrategyService } from 'src/domain/ports/cache.strategy';

export class NodeCacheService<Input, Output> implements CacheStrategyService<Input, Output> {
  private cache: NodeCache;

  constructor(ttlSeconds: number = 900) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds });
  }

  set(key: string, data: Input): boolean {
    return this.cache.set(key, data);
  }

  get(key: string): Output | undefined {
    return this.cache.get(key) as Output | undefined;
  }

  del(keys: string[]): boolean {
    if(this.cache.del([...keys]) >= 1)
    {
      return true;
    }
    return false;
  }
}
