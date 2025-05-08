import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';

describe('ServicesController', () => {
  let controller: ServicesController;
  let service: ServicesService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn().mockImplementation((dto) => ({
        id: 1,
        ...dto,
      })),
      findAll: jest.fn().mockImplementation((page: number, limit: number) => []),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        {
          provide: ServicesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
    service = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a service and return status 201', async () => {
      const createServiceDto = {
        name: 'Test Service',
        category: 'Test Category',
        price: 100,
        description: 'Test Description',
      };

      const result = await controller.create(createServiceDto);

      expect(service.create).toHaveBeenCalledWith(createServiceDto);
      expect(result).toEqual({
        id: 1,
        ...createServiceDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of services', async () => {
      const result = await controller.findAll(1, 10);
      expect(service.findAll).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual([]);
    });
  });
});
