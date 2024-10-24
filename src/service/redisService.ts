// data.service.ts
import { Injectable } from '@nestjs/common';
import { RedisConfig } from '../config/redis.config';

@Injectable()
export class DataService {
  constructor(private readonly redisConfig: RedisConfig) {}

  // // Lấy dữ liệu từ Redis hoặc DB
  // async getData() {
  //   const cachedData = await this.redisConfig.get();
  //   if (cachedData) {
  //     return cachedData; // Trả về dữ liệu từ cache
  //   }
  // }
  //
  // // Lưu dữ liệu vào DB và cache
  // async setData(key: string, data: any) {
  //   await this.databaseService.saveData(key, data);
  //   await this.redisConfig.del(key); // Xóa cache
  //   await this.redisConfig.set(key, data, 3600); // Cập nhật cache
  // }
}
