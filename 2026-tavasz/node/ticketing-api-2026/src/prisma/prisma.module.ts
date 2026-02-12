import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forRoot({ isGlobal }: { isGlobal: boolean }): DynamicModule {
    return {
      global: isGlobal,
      module: PrismaModule,
      providers: [PrismaService],
      exports: [PrismaService],
    };
  }
}
