import { PostsService } from './posts.service';
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
  constructor(private readonly postService: PostsService) {}
  @Get()
  @ApiOperation({ summary: '所有帖子' })
  async index() {
    const { res, success } = await this.postService.findAll();
    return {
      code: 200,
      success,
      data: { list: res },
    };
  }
  @Get(':id')
  @ApiOperation({ summary: '获取某个帖子' })
  async show(@Param('id') id: number) {
    const { res, success } = await this.postService.findOne(id);
    return {
      code: 200,
      success,
      data: res,
    };
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() body: CreatePostDto) {
    const { success } = await this.postService.create(body);
    return {
      url: '/posts',
      method: 'POST',
      success,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '更新帖子' })
  async update(@Param('id') id: number, @Body() body: CreatePostDto) {
    const { affected, success } = await this.postService.update(id, {
      ...body,
    });
    return {
      method: 'PUT',
      id,
      affected,
      success,
    };
  }
  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async destroy(@Param('id') id: number) {
    const routePath =
      Reflect.getMetadata(PATH_METADATA, PostsController) +
      Reflect.getMetadata(PATH_METADATA, PostsController.prototype.destroy);
    const { affected, success } = await this.postService.delete(id);
    return {
      url: routePath,
      method: 'DELETE',
      id,
      affected,
      success,
    };
  }
}
