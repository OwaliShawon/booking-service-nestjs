import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ServicesModule } from 'src/services/services.module';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [ServicesModule, BookingsModule],
  controllers: [AdminController],
})
export class AdminModule {}
