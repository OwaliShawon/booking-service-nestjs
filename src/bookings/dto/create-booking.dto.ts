import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ default: 1 })
  serviceId: number;

  @ApiProperty({ default: 'Owali Shawon' })
  customerName: string;

  @ApiProperty({ default: '01521320960' })
  phone: string;

  @ApiProperty({ default: '2025-05-10T10:00:00.000Z' })
  schedule: Date;
}
