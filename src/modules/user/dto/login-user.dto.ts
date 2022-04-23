import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'realWorld@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: '123212' })
  @IsNotEmpty()
  readonly password: string;
}

export class LoginUserRO {
  @IsNotEmpty()
  readonly user: LoginUserDto;
}
