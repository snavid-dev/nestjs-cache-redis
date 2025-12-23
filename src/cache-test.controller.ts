import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('cache-test')
export class CacheTestController {
  // 1. Not cached — always slow
  @Get('slow')
  async slow() {
    await this.delay(2000); // Fake 2-second work
    return {
      message: 'I am always slow (no cache)',
      time: new Date().toISOString(),
    };
  }

  // 2. Cached — slow only the first time
  @Get('fast')
  @UseInterceptors(CacheInterceptor) // ← This enables caching
  async fast() {
    await this.delay(2000); // Fake 2-second work (only on first request)
    console.log('Computing fast() response...'); // To see when this runs
    return {
      message: 'I am slow only once, then instant (cached!)',
      time: new Date().toISOString(),
    };
  }

  // Helper for fake delay
  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
