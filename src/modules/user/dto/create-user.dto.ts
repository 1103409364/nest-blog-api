import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "realWorld" })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: "realWorld@gmail.com" })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: "123212" })
  @IsNotEmpty()
  readonly password: string;

  readonly bio?: string;
  readonly image?: string;
}
// Request Object
export class CreateUserRO {
  @IsNotEmpty()
  readonly user: CreateUserDto;
}
