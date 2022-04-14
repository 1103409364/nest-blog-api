import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: '帖子标题', example: 'Hello World' })
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;
  @ApiProperty({ description: '帖子内容', example: 'Hello World' })
  content: string;
  @ApiProperty({ description: '帖子作者', example: 'admin' })
  author: string;
}
