import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'username', example: 'realWorld2' })
  readonly username: string;
  @ApiProperty({ description: 'email', example: 'realWorld2@gmail.com' })
  readonly email: string;
  @ApiProperty({ description: 'bio', example: '1' })
  readonly bio: string;
  @ApiProperty({ description: 'image', example: 'http://xxx.png' })
  readonly image: string;
}
