import { Module } from '@nestjs/common';
import { CacheService } from './cache-service.service';

@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheServiceModule {}
