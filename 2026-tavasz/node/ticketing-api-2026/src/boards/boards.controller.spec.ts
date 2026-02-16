import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

describe('BoardsController', () => {
  let controller: BoardsController;

  const mockBoardsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [
        {
          provide: BoardsService,
          useValue: mockBoardsService,
        },
      ],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('creates a board via service', async () => {
    const createBoardDto: CreateBoardDto = { title: 'Backlog' };
    const createdBoard = { id: 1, title: 'Backlog', createdAt: new Date() };
    mockBoardsService.create.mockResolvedValueOnce(createdBoard);

    await expect(controller.create(createBoardDto)).resolves.toEqual(
      createdBoard,
    );
    expect(mockBoardsService.create).toHaveBeenCalledWith(createBoardDto);
  });

  it('returns all boards via service', async () => {
    const boards = [{ id: 1, title: 'Backlog', createdAt: new Date() }];
    mockBoardsService.findAll.mockResolvedValueOnce(boards);

    await expect(controller.findAll()).resolves.toEqual(boards);
  });

  it('returns a board via service', async () => {
    const board = {
      id: 2,
      title: 'In progress',
      createdAt: new Date(),
      tickets: [],
    };
    mockBoardsService.findOne.mockResolvedValueOnce(board);

    await expect(controller.findOne(2)).resolves.toEqual(board);
    expect(mockBoardsService.findOne).toHaveBeenCalledWith(2);
  });

  it('updates a board via service', async () => {
    const updatedBoard = { id: 3, title: 'Done', createdAt: new Date() };
    mockBoardsService.update.mockResolvedValueOnce(updatedBoard);

    await expect(controller.update(3, { title: 'Done' })).resolves.toEqual(
      updatedBoard,
    );
    expect(mockBoardsService.update).toHaveBeenCalledWith(3, { title: 'Done' });
  });

  it('removes a board via service', async () => {
    const deletedBoard = { id: 4, title: 'Archived', createdAt: new Date() };
    mockBoardsService.remove.mockResolvedValueOnce(deletedBoard);

    await expect(controller.remove(4)).resolves.toEqual(deletedBoard);
    expect(mockBoardsService.remove).toHaveBeenCalledWith(4);
  });
});
