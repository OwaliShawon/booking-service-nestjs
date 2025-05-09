import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Service } from '../services/entities/service.entity';

describe('BookingsController', () => {
  let controller: BookingsController;
  let service: BookingsService;

  beforeEach(async () => {
    const mockBookingRepository = {};
    const mockServiceRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        BookingsService,
        {
          provide: getRepositoryToken(Booking),
          useValue: mockBookingRepository,
        },
        {
          provide: getRepositoryToken(Service),
          useValue: mockServiceRepository,
        },
      ],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a booking and return status 201', async () => {
      const createBookingDto = {
        serviceId: 1,
        customerName: 'Owali Shawon',
        phone: '01521320960',
        schedule: new Date('2025-05-10T10:00:00.000Z'),
      };

      const mockResult = {
        id: 1,
        ...createBookingDto,
        status: 'Pending',
        service: {
          id: 1,
          name: 'Service Name',
          category: 'Service Name',
          price: 10.1,
          description: 'Service Description',
          createdAt: new Date('2025-05-09T01:02:48.179Z'),
          updatedAt: new Date('2025-05-09T01:02:48.179Z'),
        },
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockResult);

      const result = await controller.create(createBookingDto);

      expect(service.create).toHaveBeenCalledWith(createBookingDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should return a booking by id', async () => {
      const id = '1';
      const mockBooking = {
        id: 1,
        customerName: 'Owali Shawon',
        phone: '01521320960',
        schedule: new Date('2025-05-10T10:00:00.000Z'),
        status: 'Pending',
        service: {
          id: 1,
          name: 'Service Name',
          category: 'Service Name',
          price: 10.1,
          description: 'Service Description',
          createdAt: new Date('2025-05-09T01:02:48.179Z'),
          updatedAt: new Date('2025-05-09T01:02:48.179Z'),
        },
      };

      jest.spyOn(service, 'findById').mockResolvedValue(mockBooking);

      const result = await controller.findOne(id);

      expect(service.findById).toHaveBeenCalledWith(Number(id));
      expect(result).toEqual(mockBooking);
    });
  });
});
