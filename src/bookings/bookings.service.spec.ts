/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Service } from '../services/entities/service.entity';
import { Repository } from 'typeorm';

describe('BookingsService', () => {
  let service: BookingsService;
  let bookingRepo: Partial<Repository<Booking>>;
  let serviceRepo: Partial<Repository<Service>>;

  beforeEach(async () => {
    bookingRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(), // Mock the save method
    };

    serviceRepo = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: getRepositoryToken(Booking),
          useValue: bookingRepo,
        },
        {
          provide: getRepositoryToken(Service),
          useValue: serviceRepo,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a booking', async () => {
      const createBookingDto = {
        customerName: 'Owali Shawon',
        phone: '01521320960',
        schedule: new Date('2025-05-10T10:00:00.000Z'),
        serviceId: 1,
      };

      const mockService = {
        id: 1,
        name: 'Service Name',
        category: 'Test Category',
        price: 100,
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockBooking = { id: 1, ...createBookingDto, service: mockService, status: 'Pending' };

      jest.spyOn(serviceRepo, 'findOne').mockResolvedValue(mockService);
      jest.spyOn(bookingRepo, 'create').mockReturnValue(mockBooking);
      jest.spyOn(bookingRepo, 'save').mockResolvedValue(mockBooking); // Mock the save method

      const result = await service.create(createBookingDto);

      expect(serviceRepo.findOne).toHaveBeenCalledWith({
        where: { id: createBookingDto.serviceId },
      });
      expect(bookingRepo.create).toHaveBeenCalledWith({
        ...createBookingDto,
        service: mockService,
      });
      expect(bookingRepo.save).toHaveBeenCalledWith(mockBooking);
      expect(result).toEqual(mockBooking);
    });
  });

  describe('findById', () => {
    it('should return a booking by id', async () => {
      const mockBooking = {
        id: 1,
        customerName: 'Owali Shawon',
        phone: '01521320960',
        schedule: new Date('2025-05-10T10:00:00.000Z'),
        service: {
          id: 1,
          name: 'Service Name',
          category: 'Test Category',
          price: 100,
          description: 'Test Description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        status: 'Pending',
      };

      jest.spyOn(bookingRepo, 'findOne').mockResolvedValue(mockBooking);

      const result = await service.findById(1);

      expect(bookingRepo.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['service'],
      });
      expect(result).toEqual(mockBooking);
    });
  });
});
