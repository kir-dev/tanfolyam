import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';

@Module({
  controllers: [LabelsController],
  providers: [LabelsService],
})
export class LabelsModule {}
