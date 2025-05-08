import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';

describe('ServicesService', () => {
  let service: ServicesService;
  let repository: Repository<Service>;

  beforeEach(async () => {
    const mockRepository = {
      save: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Test Service',
        category: 'Test Category',
        price: 100,
        description: 'Test Description',
      }),
      find: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: 'Test Service',
          category: 'Test Category',
          price: 100,
          description: 'Test Description',
        },
      ]),
      findOneBy: jest.fn().mockResolvedValue({
        id: 1,
        name: 'Test Service',
        category: 'Test Category',
        price: 100,
        description: 'Test Description',
      }),
      update: jest.fn().mockResolvedValue({ affected: 1 }),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: getRepositoryToken(Service),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    repository = module.get<Repository<Service>>(getRepositoryToken(Service));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a service', async () => {
      const createServiceDto = {
        name: 'Test Service',
        category: 'Test Category',
        price: 100,
        description: 'Test Description',
      };

      const result = await service.create(createServiceDto);

      expect(repository.save).toHaveBeenCalledWith(createServiceDto);
      expect(result).toEqual({
        id: 1,
        ...createServiceDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of services', async () => {
      const result = await service.findAll(1, 10);

      expect(repository.find).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
      expect(result).toEqual([
        {
          id: 1,
          name: 'Test Service',
          category: 'Test Category',
          price: 100,
          description: 'Test Description',
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a service by ID', async () => {
      const id = 1;
      const result = await service.findOne(id);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual({
        id: 1,
        name: 'Test Service',
        category: 'Test Category',
        price: 100,
        description: 'Test Description',
      });
    });
  });

  describe('update', () => {
    it('should update a service by ID', async () => {
      const id = 1;
      const updateServiceDto = {
        name: 'Updated Service',
        category: 'Updated Category',
        price: 150,
        description: 'Updated Description',
      };

      const result = await service.update(id, updateServiceDto);

      expect(repository.update).toHaveBeenCalledWith(id, updateServiceDto);
      expect(result).toEqual({
        affected: 1,
      });
    });
  });

  describe('remove', () => {
    it('should remove a service by ID', async () => {
      const id = 1;
      const result = await service.remove(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({
        affected: 1,
      });
    });
  });
});
