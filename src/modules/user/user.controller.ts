import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import {
  CreateUserRO,
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto,
  LoginUserRO,
  UpdateUserRO,
} from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.decorator';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @ApiOperation({ summary: 'find me detail info' })
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Put('user')
  @ApiOperation({ summary: 'update user by userId' })
  @ApiBody({ type: UpdateUserRO })
  async update(
    @User('id') userId: number,
    @Body('user') userData: UpdateUserDto,
  ) {
    return await this.userService.update(userId, userData);
  }

  @ApiOperation({ summary: 'create user' })
  @ApiBody({ type: CreateUserRO })
  @Post('users')
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @ApiOperation({ summary: 'delete article by slug' })
  @Delete('users/:slug')
  async delete(@Param('slug') slug: string, @User('id') id: number) {
    return await this.userService.delete(slug, id);
  }

  @ApiOperation({ summary: 'login' })
  @ApiBody({ type: LoginUserRO })
  @Post('users/login')
  async login(@Body('user') loginUserDto: LoginUserDto) {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    const token = await this.userService.generateJWT(_user);
    const { email, username, bio, image } = _user;
    const user = { email, token, username, bio, image };
    return { user };
  }
}
