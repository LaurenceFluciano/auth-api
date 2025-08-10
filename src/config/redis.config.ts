import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export class RedisConnect {
    private static client: RedisClientType;
        
    private static async createConnection(): Promise<void> {
        if(!this.client){
            const { REDIS_USER, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;

            if (!REDIS_USER || !REDIS_PASSWORD || !REDIS_HOST || !REDIS_PORT) {
            throw new Error('Redis Environment variables are undefined or empty!');
            }

            const redisPort = parseInt(REDIS_PORT, 10);
            if (isNaN(redisPort) || redisPort <= 0 || redisPort > 65535) {
            throw new Error('REDIS_PORT environment variable must be a valid port number!');
            }

            const client = createClient({
            username: REDIS_USER,
            password: REDIS_PASSWORD,
            socket: {
                host: REDIS_HOST,
                port: redisPort,
            },
            });

            client.on('error', (err) => {
                console.error('Redis Client Error:', err);
                throw new Error("Redis can't be connected! Using im-memory default cache")
            });

            await client.connect();
            this.client = client as RedisClientType;
        }
    }

    static async getClient(): Promise<RedisClientType> {
        if (!this.client) {
            await this.createConnection();
        }
        return this.client as RedisClientType;
    }
}
