import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserRO {
  readonly user: UpdateUserDto;
}
