import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: 'email', example: 'realWorld@gmail.com' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'password', example: 'realWorld@gmail.com' })
  @IsNotEmpty()
  readonly password: string;
}
