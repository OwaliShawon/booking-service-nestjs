import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Service } from '../services/entities/service.entity';
import { NotificationService } from 'src/notification/notification.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
    private notificationService: NotificationService,
  ) {}

  async create(data: CreateBookingDto) {
    const service = await this.serviceRepo.findOne({
      where: { id: data.serviceId },
    });
    if (!service) throw new NotFoundException('Service not found');

    const booking = this.bookingRepo.create({ ...data, service });

    this.notificationService.sendBookingConfirmationSms(data.phone, {
      schedule: data.schedule,
      serviceName: service.name,
    });
    this.notificationService.sendBookingConfirmationEmail(data.email, {
      schedule: data.schedule,
      serviceName: service.name,
    });

    return this.bookingRepo.save(booking);
  }

  async findById(id: number) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['service'],
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async findAll() {
    return this.bookingRepo.find({ relations: ['service'] });
  }
}
