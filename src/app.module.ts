import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { CacheTestController } from './cache-test.controller';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      stores: [new KeyvRedis('redis://localhost:6379')],
      ttl: 300_000,
    }),
  ],
  controllers: [AppController, CacheTestController],
  providers: [AppService],
})
export class AppModule {}
