import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'realWorld@gmail.com' })
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
