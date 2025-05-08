import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiProperty({ required: false, default: 'Service Name' })
  name?: string;

  @ApiProperty({ required: false, default: 'Service Category' })
  category?: string;

  @ApiProperty({ required: false, default: 10.1 })
  price?: number;

  @ApiProperty({ required: false, default: 'Service Description' })
  description?: string;
}
