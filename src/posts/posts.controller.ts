import { Controller, Get, Post } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get()
  index() {
    return [
      { id: 1, title: 'Hello World' },
      { id: 2, title: 'Hello World 2' },
    ];
  }
  @Post()
  create() {
    return {
      success: true,
    };
  }
}
