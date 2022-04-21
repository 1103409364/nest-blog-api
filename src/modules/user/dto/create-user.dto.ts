import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
// Request Object
export class CreateUserRO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'user',
    example: {
      username: 'realWorld',
      email: 'realWorld@gmail.com',
      password: '123212',
    },
  })
  readonly user: CreateUserDto;
}
