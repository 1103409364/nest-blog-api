import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  readonly body: string;
}

export class CreateCommentRO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'user',
    example: {
      body: 'realWorld',
    },
  })
  readonly comment: CreateCommentDto;
}
