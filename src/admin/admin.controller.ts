import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { BookingsService } from '../bookings/bookings.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateServiceDto } from 'src/services/dto/create-service.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly bookingsService: BookingsService,
  ) {}

  @Get('bookings')
  findAllBookings() {
    return this.bookingsService.findAll();
  }

  @Post('services')
  createService(
    @Body()
    body: CreateServiceDto,
  ) {
    return this.servicesService.create(body);
  }

  @Put('services/:id')
  updateService(@Param('id') id: number, @Body() body: any) {
    return this.servicesService.update(id, body);
  }

  @Delete('services/:id')
  deleteService(@Param('id') id: number) {
    return this.servicesService.remove(id);
  }
}
