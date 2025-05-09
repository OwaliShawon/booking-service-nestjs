import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({ default: 'admin' })
  username: string;

  @ApiProperty({ default: 'admin123' })
  password: string;
}
