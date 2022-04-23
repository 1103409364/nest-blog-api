export class UpdateUserDto {
  readonly username: string;
  readonly email: string;
  readonly bio: string;
  readonly image: string;
}

export class UpdateUserRO {
  readonly user: UpdateUserDto;
}
