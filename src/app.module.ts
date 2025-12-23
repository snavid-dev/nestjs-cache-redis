import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import * as process from 'node:process';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore as any,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      ttl: Number(process.env.REDIS_TTL), // seconds
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
