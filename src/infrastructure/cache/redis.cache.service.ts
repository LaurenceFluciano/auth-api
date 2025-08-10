import { RedisClientType } from 'redis';
import { RedisConnect } from 'src/config/redis.config';
import { CacheStrategyService } from 'src/domain/ports/cache/cache.strategy';

export class RedisCacheService<Input, Output> implements CacheStrategyService<Input, Output> {
    private client: RedisClientType;

    async init() {
        this.client = await RedisConnect.getClient();
    }

    async set(key: string, data: Input, expireIn: number = 900): Promise<boolean> {
        const result = await this.client.set(key, JSON.stringify(data));
        if(!result) return false
        await this.client.expire(key, expireIn)
        return true
    }

    async get(key: string): Promise<Output | undefined> {
        const data = await this.client.get(key);
        if (!data) return undefined;
        return JSON.parse(data) as Output;
    }

    async del(keys: string[]): Promise<boolean> {
        const deletedCount = await this.client.del(keys);
        return deletedCount >= 1;
    }
}
