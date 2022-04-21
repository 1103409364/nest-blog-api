import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export class LoginUserRO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'user',
    example: {
      email: 'realWorld@gmail.com',
      password: '123212',
    },
  })
  readonly user: LoginUserDto;
}
