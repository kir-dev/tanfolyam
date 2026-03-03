/* eslint-disable @typescript-eslint/unbound-method */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TicketPhase } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { Prisma } from '../lib/mocks/prisma-client';

describe('TicketsService', () => {
  let service: TicketsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    ticket: {
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
        TicketsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a ticket', async () => {
    const createTicketDto = {
      name: 'Fix login',
      description: 'Broken login',
      ticketPhase: TicketPhase.CREATED,
      boardsId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdTicket: Ticket = { id: 10, ...createTicketDto };
    mockPrismaService.ticket.create.mockResolvedValueOnce(createdTicket);

    await expect(service.create(createTicketDto)).resolves.toEqual(
      createdTicket,
    );
    expect(prisma.ticket.create).toHaveBeenCalledWith({
      data: createTicketDto,
    });
  });

  it('throws when board does not exist on create', async () => {
    mockPrismaService.ticket.create.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError(
        'Foreign key constraint failed on the field: `boardsId`',
        'P2003',
      ),
    );

    await expect(
      service.create({
        name: 'T',
        ticketPhase: TicketPhase.CREATED,
        boardsId: 999,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('throws when ticket not found', async () => {
    mockPrismaService.ticket.findUnique.mockResolvedValueOnce(null);

    await expect(service.findOne(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('throws when updating a missing ticket', async () => {
    mockPrismaService.ticket.update.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError('Ticket not found', 'P2025'),
    );

    await expect(
      service.update(404, { name: 'New', ticketPhase: TicketPhase.CREATED }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('assigns a label to a ticket', async () => {
    const ticketWithLabels = {
      id: 1,
      name: 'T1',
      ticketPhase: TicketPhase.CREATED,
      labels: [{ id: 2 }],
    };
    mockPrismaService.ticket.update.mockResolvedValueOnce(ticketWithLabels);

    await expect(service.assignLabel(1, 2)).resolves.toEqual(ticketWithLabels);
    expect(prisma.ticket.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { labels: { connect: { id: 2 } } },
      include: { labels: true },
    });
  });

  it('throws when assigning with invalid label', async () => {
    mockPrismaService.ticket.update.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError(
        'Foreign key constraint failed on the field: `labelsId`',
        'P2003',
      ),
    );

    await expect(service.assignLabel(1, 999)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('throws when removing a label fails', async () => {
    mockPrismaService.ticket.update.mockRejectedValueOnce(new Error('boom'));

    await expect(service.removeLabel(1, 2)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
