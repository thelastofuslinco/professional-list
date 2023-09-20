import {
  Controller,
  Put,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async getUsers(
    @Query('name') name: string,
    @Query('cpf') cpf: string,
    @Query('email') email: string,
    @Query('phone') phone: string,
    @Query('orderBy') orderBy: 'asc' | 'desc',
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

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id });
  }

  @Post('user')
  async signupUser(
    @Body()
    user: UserModel,
  ): Promise<UserModel> {
    return this.userService.createUser(user);
  }

  @Put('user/:id')
  async updateTask(
    @Param('id') id: string,
    @Body()
    data: UserModel,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id },
      data,
    });
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }
}
