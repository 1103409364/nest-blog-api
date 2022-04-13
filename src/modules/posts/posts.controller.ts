import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './posts.dto';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  @Get()
  @ApiOperation({ summary: '搜索帖子' })
  index() {
    return [
      { id: 1, title: 'Hello World' },
      { id: 2, title: 'Hello World 2' },
    ];
  }
  @Get(':id')
  @ApiOperation({ summary: '获取帖子详情' })
  show(@Param('id') id: string) {
    return { id };
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  create(@Body() body: CreatePostDto) {
    return {
      body,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '更新帖子' })
  update(@Param('id') id: string, @Body() body: CreatePostDto) {
    return {
      success: true,
      body,
    };
  }
  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  destroy(@Param('id') id: string) {
    const routePath =
      Reflect.getMetadata(PATH_METADATA, PostsController) +
      Reflect.getMetadata(PATH_METADATA, PostsController.prototype.destroy);
    return {
      routePath,
      method: 'DELETE',
      id,
      success: true,
    };
  }
}
