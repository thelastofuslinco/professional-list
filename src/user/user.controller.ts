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
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { UpdateUserDto } from './dto/updateArticleDto';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getUsers(
    @Query('name') name?: string,
    @Query('cpf') cpf?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string,
    @Query('orderBy') orderBy?: 'asc' | 'desc',
  ): Promise<UserModel[]> {
    return this.userService.users({
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
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userService.user({ id });

    if (!user) {
      throw new NotFoundException(`User ${id} does not exist.`);
    }

    return this.userService.user({ id });
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async signupUser(
    @Body()
    user: CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity })
  async updateUser(
    @Param('id') id: string,
    @Body()
    data: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }
}
