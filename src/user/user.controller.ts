import {
  Controller,
  Put,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { UpdateUserDto } from './dto/updateArticleDto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async signupUser(
    @Body()
    data: CreateUserDto,
  ): Promise<UserModel> {
    const user = await this.userService.createUser(data);
    return new UserEntity(user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getUsers(
    @Query('name') name?: string,
    @Query('cpf') cpf?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ): Promise<UserModel[]> {
    const users = await this.userService.users({
      orderBy: {
        name: orderBy,
      },
      where: {
        AND: [
          { name: { contains: name } },
          { cpf: { contains: cpf } },
          { email: { contains: email } },
          { phone: { contains: phone } },
        ],
      },
    });

    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userService.user({ id });

    if (!user) {
      throw new NotFoundException(`User ${id} does not exist.`);
    }

    return new UserEntity(user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async updateUser(
    @Param('id') id: string,
    @Body()
    data: UpdateUserDto,
  ): Promise<UserModel> {
    const user = await this.userService.updateUser({
      where: { id },
      data,
    });

    return new UserEntity(user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userService.deleteUser({ id });

    return new UserEntity(user);
  }
}
