import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { SECRET } from '@/config/secret';
import { UserRO } from './user.interface';
import { validate } from 'class-validator';
import { UserEntity } from './entities/user.entity';
import { ArticleEntity } from '../article/entities/article.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne({ email, password }: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    // check uniqueness of username/email
    const { username, email, password } = dto;
    const user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (user) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    // newUser.articles = [];

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    const toUpdate = await this.userRepository.findOne({ where: { id } });

    const user = await this.userRepository.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });

    if (user && user.id !== id) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!toUpdate) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, HttpStatus.NOT_FOUND);
    }

    delete toUpdate.password;
    // delete toUpdate.favorites;
    const updated = Object.assign(toUpdate, dto);
    const errors = await validate(updated);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.userRepository.save(updated);
    }
  }

  async delete(slug: string, userId: number): Promise<DeleteResult> {
    const article = await this.articleRepository.findOne({
      where: { slug },
      relations: ['author'],
    });

    if (!article) {
      const errors = { Article: ' not found' };
      throw new HttpException({ errors }, HttpStatus.NOT_FOUND);
    }
    if (article.author.id === userId) {
      const deleteRes = await this.articleRepository.delete({ slug });
      return { ...deleteRes, raw: article };
    }

    const errors = { article: 'delete Forbidden' };
    throw new HttpException({ errors }, HttpStatus.FORBIDDEN);
  }

  async findById(id: number): Promise<UserRO> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, HttpStatus.UNAUTHORIZED);
    }

    return this.buildUserRO(user);
  }

  async findByEmail(email: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ where: { email } });
    return this.buildUserRO(user);
  }

  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      token: this.generateJWT(user),
      image: user.image,
    };

    return { user: userRO };
  }
}
