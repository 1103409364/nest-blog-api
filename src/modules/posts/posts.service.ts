import { PostsEntity } from './posts.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  async findAll() {
    try {
      const res = await this.postsRepository.find();
      return { res, success: true };
    } catch (error) {
      return { error, success: false };
    }
  }

  async findOne(id: number) {
    try {
      const res = await this.postsRepository.findOne({ where: { id } });
      return { success: true, res };
    } catch (error) {
      return { error, success: false };
    }
  }

  async create(posts: PostsEntity) {
    try {
      const res = await this.postsRepository.save(posts);
      return { res, success: true };
    } catch (error) {
      return { error, success: false };
    }
  }

  async update(id: number, posts: PostsEntity) {
    try {
      const { affected } = await this.postsRepository.update({ id }, posts);
      return { affected, success: true };
    } catch (error) {
      return { error, success: false };
    }
  }

  async delete(id: number) {
    try {
      const { affected } = await this.postsRepository.delete({ id });
      return { affected, success: true };
    } catch (error) {
      return { error, success: false };
    }
  }
}
