import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'realWorld' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'realWorld@gmail.com' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '123212' })
  @IsNotEmpty()
  readonly password: string;
}
// Request Object
export class CreateUserRO {
  @IsNotEmpty()
  readonly user: CreateUserDto;
}
