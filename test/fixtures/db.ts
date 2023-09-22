import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../src/prisma/prisma.service';
import { UserController } from '../../src/user/user.controller';
import { UserService } from '../../src/user/user.service';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

export const mock_user_one: User = {
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

export const mock_user_two: User = {
  id: 'user_one_two',
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
    controllers: [UserController, AuthController],
    providers: [UserService, PrismaService, AuthService, JwtService],
  }).compile();

  const authController = app.get<AuthController>(AuthController);
  const userController = app.get<UserController>(UserController);
  const userService = app.get<UserService>(UserService);
  await userService.deleteUsers();
  const { id } = await userService.createUser(mock_user_one);

  return { userService, userController, id, authController };
};
