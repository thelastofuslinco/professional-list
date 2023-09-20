import { Controller, Put, Body, Get, Param, Query } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User as UserModel } from '@prisma/client';

@Controller()
export class RecordController {
  constructor(private readonly userService: UserService) {}

  @Get('record')
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

  @Get('record/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id });
  }

  @Put('record/:id')
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
}
