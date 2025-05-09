import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
  ) {}

  async create(data: {
    customerName: string;
    phone: string;
    schedule: Date;
    serviceId: number;
  }) {
    const service = await this.serviceRepo.findOne({
      where: { id: data.serviceId },
    });
    if (!service) throw new NotFoundException('Service not found');

    const booking = this.bookingRepo.create({ ...data, service });
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
