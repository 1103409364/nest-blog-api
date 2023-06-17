import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "realWorld" })
  @IsNotEmpty() // 验证器，由 class-validator 提供，用于验证字段是否为空，是否是邮箱等。全局配置在 src/utils/validation.pipe.ts
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
