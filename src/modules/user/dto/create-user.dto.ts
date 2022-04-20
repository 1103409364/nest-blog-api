import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'username', example: 'realWorld' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: 'email', example: 'realWorld@gmail.com' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'password', example: '123212' })
  @IsNotEmpty()
  readonly password: string;
}
