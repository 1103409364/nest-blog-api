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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @ApiOperation({ summary: 'find user by email' })
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
  }

  @Put('user/:userId')
  @ApiOperation({ summary: 'update user by id' })
  @ApiParam({ name: 'userId', description: 'id' })
  async update(@Param() params, @Body() userData: UpdateUserDto) {
    return await this.userService.update(params.userId, userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('users')
  @ApiOperation({ summary: 'create user' })
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('users/:email')
  @ApiOperation({ summary: 'delete by email' })
  @ApiParam({ name: 'email', description: 'email' })
  async delete(@Param() params) {
    return await this.userService.delete(params.email);
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  @ApiOperation({ summary: 'login' })
  async login(@Body() loginUserDto: LoginUserDto) {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    const token = await this.userService.generateJWT(_user);
    const { email, username, bio, image } = _user;
    const user = { email, token, username, bio, image };
    return { user };
  }
}
