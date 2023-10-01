import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/updateArticleDto';

export const roundsOfHashing = 8;
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    let password;
    const authenticated_at = data.authenticated ? new Date() : null;

    data?.password &&
      (password = await bcrypt.hash(data.password, roundsOfHashing));

    data?.cpf &&
      (data.cpf = data.cpf.replaceAll(
        /(\d{3})(\d{3})(\d{3})(\d{2})/g,
        '$1.$2.$3-$4',
      ));

    return this.prisma.user.create({
      data: { ...data, password, authenticated_at },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<User> {
    const { where, data } = params;
    let password;
    const authenticated_at = data.authenticated ? new Date() : null;

    data?.password &&
      (password = await bcrypt.hash(data.password, roundsOfHashing));

    data?.cpf &&
      (data.cpf = data.cpf.replaceAll(
        /(\d{3})(\d{3})(\d{3})(\d{2})/g,
        '$1.$2.$3-$4',
      ));

    return this.prisma.user.update({
      data: { ...data, password, authenticated_at },
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async deleteUsers() {
    await this.prisma.user.deleteMany();
  }
}
