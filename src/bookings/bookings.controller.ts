import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(
    @Body()
    body: CreateBookingDto,
  ) {
    return this.bookingsService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findById(+id);
  }
}
