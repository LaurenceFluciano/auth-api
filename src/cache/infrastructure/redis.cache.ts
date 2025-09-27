import { RedisClientType } from 'redis';
import { RedisConnect } from 'src/config/redis.config';
import { CacheStrategyService } from 'src/cache/domain/interface/cache.strategy';
import { OnModuleInit } from '@nestjs/common';

export class RedisCacheService<Input, Output> implements CacheStrategyService<Input, Output>, OnModuleInit {
    private client: RedisClientType;

    async onModuleInit() {
        await this.init();
    }

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

    multiExec(operations: (pipeline: ReturnType<typeof this.client.multi>) => void): Promise<any> {
        const pipeline = this.client.multi();
        operations(pipeline);
        return pipeline.exec();
    }
}
