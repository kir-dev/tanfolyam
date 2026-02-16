import { Test, TestingModule } from '@nestjs/testing';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';

describe('LabelsController', () => {
  let controller: LabelsController;

  const mockLabelsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabelsController],
      providers: [
        {
          provide: LabelsService,
          useValue: mockLabelsService,
        },
      ],
    }).compile();

    controller = module.get<LabelsController>(LabelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('creates a label via service', async () => {
    const createLabelDto: CreateLabelDto = { name: 'Bug', color: '#ff0000' };
    const createdLabel = { id: 1, name: 'Bug', color: '#ff0000' };
    mockLabelsService.create.mockResolvedValueOnce(createdLabel);

    await expect(controller.create(createLabelDto)).resolves.toEqual(
      createdLabel,
    );
    expect(mockLabelsService.create).toHaveBeenCalledWith(createLabelDto);
  });

  it('returns all labels via service', async () => {
    const labels = [{ id: 1, name: 'Bug', color: '#ff0000' }];
    mockLabelsService.findAll.mockResolvedValueOnce(labels);

    await expect(controller.findAll()).resolves.toEqual(labels);
  });

  it('returns a single label via service', async () => {
    const label = { id: 2, name: 'Feature', color: '#00ff00' };
    mockLabelsService.findOne.mockResolvedValueOnce(label);

    await expect(controller.findOne(2)).resolves.toEqual(label);
    expect(mockLabelsService.findOne).toHaveBeenCalledWith(2);
  });

  it('updates a label via service', async () => {
    const updatedLabel = { id: 3, name: 'Ops', color: '#0000ff' };
    mockLabelsService.update.mockResolvedValueOnce(updatedLabel);

    await expect(
      controller.update(3, { name: 'Ops', color: '#0000ff' }),
    ).resolves.toEqual(updatedLabel);
    expect(mockLabelsService.update).toHaveBeenCalledWith(3, {
      name: 'Ops',
      color: '#0000ff',
    });
  });

  it('removes a label via service', async () => {
    const deletedLabel = { id: 4, name: 'Old', color: '#ffffff' };
    mockLabelsService.remove.mockResolvedValueOnce(deletedLabel);

    await expect(controller.remove(4)).resolves.toEqual(deletedLabel);
    expect(mockLabelsService.remove).toHaveBeenCalledWith(4);
  });
});
