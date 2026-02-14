import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  exports: [LoggerMiddleware],
  providers: [LoggerMiddleware],
})
export class CommonModule {}
