import { Test, TestingModule } from '@nestjs/testing';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { PrismaService } from '../prisma/prisma.service';

describe('LabelsController', () => {
  let controller: LabelsController;

  const mockPrismaService = {
    label: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabelsController],
      providers: [
        LabelsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<LabelsController>(LabelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
