import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  readonly title: string;
  readonly description: string;
  @IsNotEmpty()
  readonly body: string;
  readonly tagList: string[];
}
export class CreateArticleRO {
  @IsNotEmpty()
  @ApiProperty({
    description: 'user',
    example: {
      title: 'realWorld',
      description: 'realWorld',
      body: 'realWorld',
      tagList: ['realWorld'],
    },
  })
  readonly article: CreateArticleDto;
}
