import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ default: 'Service Name' })
  name: string;

  @ApiProperty({ default: 'Service Name' })
  category: string;

  @ApiProperty({ default: 10.1 })
  price: number;

  @ApiProperty({ default: 'Service Description' })
  description: string;
}
