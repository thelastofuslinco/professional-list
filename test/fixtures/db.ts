import { Test, TestingModule } from '@nestjs/testing';
import { User as UserModel } from '@prisma/client';
import { UserController } from '../../src/modules/user/user.controller';
import { UserService } from '../../src/modules/user/user.service';
import { PrismaService } from '../../src/prisma.service';

export const mock_user_one: UserModel = {
  id: 'user_one_id',
  name: 'user_one_name',
  email: 'user_one_mail@mail.com',
  cpf: 'user_one_cpf',
  phone: 'user_one_phone',
  password: '12345678',
  authenticated: null,
  skills: ['valid_skill'],
  created_at: new Date(),
};

export const mock_user_two: UserModel = {
  id: 'user_two_id',
  name: 'user_two_name',
  email: 'user_two_mail@mail.com',
  cpf: 'user_two_cpf',
  phone: 'user_two_phone',
  password: '12345678',
  authenticated: null,
  skills: ['valid_skill'],
  created_at: new Date(),
};

export const setupDataBase = async () => {
  const app: TestingModule = await Test.createTestingModule({
    controllers: [UserController],
    providers: [UserService, PrismaService],
  }).compile();

  const userController = app.get<UserController>(UserController);
  const userService = app.get<UserService>(UserService);
  await userService.deleteUsers();
  await userService.createUser(mock_user_one);

  return { userService, userController };
};
