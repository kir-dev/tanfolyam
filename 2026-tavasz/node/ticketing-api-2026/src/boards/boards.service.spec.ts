/* eslint-disable @typescript-eslint/unbound-method */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { Prisma } from '../lib/mocks/prisma-client';

describe('BoardsService', () => {
  let service: BoardsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    boards: {
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
        BoardsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a board', async () => {
    const createBoardDto: CreateBoardDto = { title: 'Backlog' };
    const createdBoard: Board = {
      id: 1,
      title: 'Backlog',
      createdAt: new Date(),
    };
    mockPrismaService.boards.create.mockResolvedValueOnce(createdBoard);

    await expect(service.create(createBoardDto)).resolves.toEqual(createdBoard);
    expect(prisma.boards.create).toHaveBeenCalledWith({
      data: createBoardDto,
    });
  });

  it('throws when creating a board fails', async () => {
    mockPrismaService.boards.create.mockRejectedValueOnce(new Error('boom'));

    await expect(service.create({ title: 'Backlog' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('throws when board is not found', async () => {
    mockPrismaService.boards.findUnique.mockResolvedValueOnce(null);

    await expect(service.findOne(99)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws when updating a missing board', async () => {
    mockPrismaService.boards.update.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError('Record not found', 'P2025'),
    );

    await expect(service.update(404, { title: 'Ops' })).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
