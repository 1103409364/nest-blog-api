import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: '帖子标题', example: 'Hello World' })
  title: string;
  @ApiProperty({ description: '帖子内容', example: 'Hello World' })
  content: string;
  @ApiProperty({ description: '帖子作者', example: 'admin' })
  author: string;
}
