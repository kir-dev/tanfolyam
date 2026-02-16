/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';

describe('LabelsService', () => {
  let service: LabelsService;
  let prisma: PrismaService;

  // const makePrismaError = (code: string) =>
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //   Object.assign(
  //     Object.create(Prisma.PrismaClientKnownRequestError.prototype),
  //     { code },
  //   );

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
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LabelsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<LabelsService>(LabelsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a label', async () => {
    const createLabelDto: CreateLabelDto = { name: 'Bug', color: '#ff0000' };
    const createdLabel = { id: 1, name: 'Bug', color: '#ff0000' };
    mockPrismaService.label.create.mockResolvedValueOnce(createdLabel);

    await expect(service.create(createLabelDto)).resolves.toEqual(createdLabel);
    expect(prisma.label.create).toHaveBeenCalledWith({ data: createLabelDto });
  });

  it('throws when creating a label fails', async () => {
    mockPrismaService.label.create.mockRejectedValueOnce(new Error('boom'));

    await expect(
      service.create({ name: 'Bug', color: '#ff0000' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('returns all labels', async () => {
    const labels = [
      { id: 1, name: 'Bug', color: '#ff0000' },
      { id: 2, name: 'Feature', color: '#00ff00' },
    ];
    mockPrismaService.label.findMany.mockResolvedValueOnce(labels);

    await expect(service.findAll()).resolves.toEqual(labels);
    expect(prisma.label.findMany).toHaveBeenCalledWith();
  });

  it('throws when label is not found', async () => {
    mockPrismaService.label.findUnique.mockResolvedValueOnce(null);

    await expect(service.findOne(42)).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.label.findUnique).toHaveBeenCalledWith({ where: { id: 42 } });
  });

  // it('throws when updating a missing label', async () => {
  //   const error = makePrismaError('P2025');
  //   mockPrismaService.label.update.mockRejectedValueOnce(error);

  //   await expect(
  //     service.update(404, { name: 'Ops', color: '#0000ff' }),
  //   ).rejects.toBeInstanceOf(NotFoundException);
  // });

  // it('throws when deleting a missing label', async () => {
  //   const error = makePrismaError('P2025');
  //   mockPrismaService.label.delete.mockRejectedValueOnce(error);

  //   await expect(service.remove(404)).rejects.toBeInstanceOf(NotFoundException);
  // });
});
