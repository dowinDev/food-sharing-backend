import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisConfig {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCacheKey(key: string, value: string): Promise<void> {
    await this.cacheManager.set(key, value);
  }

  async getCacheKey(key: string): Promise<string> {
    return await this.cacheManager.get(key);
  }

  //private redisClient: Redis;

  // onModuleInit() {
  //   this.redisClient = new Redis({
  //     host: 'localhost', // Địa chỉ Redis (Docker hoặc local)
  //     port: 6379, // Cổng Redis mặc định
  //   });
  //
  //   this.redisClient.on('connect', () => {
  //     console.log('Redis connected');
  //   });
  //
  //   this.redisClient.on('error', (err) => {
  //     console.error('Redis error', err);
  //   });
  // }
  //
  // onModuleDestroy() {
  //   this.redisClient.quit();
  // }
  //
  // async get(key: string) {
  //   const data = await this.redisClient.get(key);
  //   return data ? JSON.parse(data) : null; // Nếu có dữ liệu, trả về
  // }
  //
  // async set(key: string, value: any, ttl?: number) {
  //   const jsonData = JSON.stringify(value);
  //   await this.redisClient.set(key, jsonData);
  //   if (ttl) {
  //     await this.redisClient.expire(key, ttl); // Đặt thời gian sống cho cache
  //   }
  // }
  //
  // async del(key: string) {
  //   await this.redisClient.del(key);
  // }
}
