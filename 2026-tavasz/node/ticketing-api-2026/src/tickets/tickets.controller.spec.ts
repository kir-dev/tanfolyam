import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketPhase } from '../lib/mocks/prisma-client';

describe('TicketsController', () => {
  let controller: TicketsController;

  const mockTicketsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    assignLabel: jest.fn(),
    removeLabel: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        {
          provide: TicketsService,
          useValue: mockTicketsService,
        },
      ],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('creates a ticket via service', async () => {
    const createTicketDto: CreateTicketDto = {
      name: 'T1',
      ticketPhase: TicketPhase.CREATED,
      description: 'Desc',
      boardsId: 1,
    };
    const createdTicket = { id: 1, ...createTicketDto };
    mockTicketsService.create.mockResolvedValueOnce(createdTicket);

    await expect(controller.create(createTicketDto)).resolves.toEqual(
      createdTicket,
    );
    expect(mockTicketsService.create).toHaveBeenCalledWith(createTicketDto);
  });

  it('returns all tickets via service', async () => {
    const tickets = [{ id: 1, name: 'T1', labels: [] }];
    mockTicketsService.findAll.mockResolvedValueOnce(tickets);

    await expect(controller.findAll()).resolves.toEqual(tickets);
  });

  it('returns a ticket via service', async () => {
    const ticket = { id: 2, name: 'T2', labels: [] };
    mockTicketsService.findOne.mockResolvedValueOnce(ticket);

    await expect(controller.findOne(2)).resolves.toEqual(ticket);
    expect(mockTicketsService.findOne).toHaveBeenCalledWith(2);
  });

  it('updates a ticket via service', async () => {
    const updatedTicket = { id: 3, name: 'Updated' };
    mockTicketsService.update.mockResolvedValueOnce(updatedTicket);

    await expect(controller.update(3, { name: 'Updated' })).resolves.toEqual(
      updatedTicket,
    );
    expect(mockTicketsService.update).toHaveBeenCalledWith(3, {
      name: 'Updated',
    });
  });

  it('removes a ticket via service', async () => {
    const deletedTicket = { id: 4, name: 'Old' };
    mockTicketsService.remove.mockResolvedValueOnce(deletedTicket);

    await expect(controller.remove(4)).resolves.toEqual(deletedTicket);
    expect(mockTicketsService.remove).toHaveBeenCalledWith(4);
  });

  it('assigns a label via service', async () => {
    const ticketWithLabels = { id: 5, name: 'T5', labels: [{ id: 9 }] };
    mockTicketsService.assignLabel.mockResolvedValueOnce(ticketWithLabels);

    await expect(controller.assignLabel(5, 9)).resolves.toEqual(
      ticketWithLabels,
    );
    expect(mockTicketsService.assignLabel).toHaveBeenCalledWith(5, 9);
  });

  it('removes a label via service', async () => {
    const ticketWithLabels = { id: 6, name: 'T6', labels: [] };
    mockTicketsService.removeLabel.mockResolvedValueOnce(ticketWithLabels);

    await expect(controller.removeLabel(6, 9)).resolves.toEqual(
      ticketWithLabels,
    );
    expect(mockTicketsService.removeLabel).toHaveBeenCalledWith(6, 9);
  });
});
