// file for initializing redis cache

import Redis, { Redis as RedisClient } from 'ioredis';

class RedisService {
    private redisClient: RedisClient;

    constructor() {
        this.redisClient = new Redis();
    }

    async get(key: string): Promise<any | null> {
        const cachedData = await this.redisClient.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
    }

    async set(key: string, value: any, ttl: number = 60): Promise<void> {
        await this.redisClient.set(key, JSON.stringify(value), 'EX', ttl);
    }
}

export const redisService = new RedisService();