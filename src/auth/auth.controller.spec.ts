import { UserService } from '../user/user.service';
import { mock_user_one } from '../../test/fixtures/db';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';

describe('UserController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [AuthController],
      providers: [UserService, PrismaService, AuthService, JwtService],
    }).compile();

    const userService = app.get<UserService>(UserService);
    await userService.deleteUsers();
    await userService.createUser(mock_user_one);
    authController = app.get<AuthController>(AuthController);
  });

  describe('/users', () => {
    it('should login user', async () => {
      const response = await authController.login({
        email: mock_user_one.email,
        password: mock_user_one.password,
      });

      expect(response.accessToken).not.toBeNull();
    });

    it('should not login non-existent user', async () => {
      try {
        await authController.login({
          email: 'invalid@mail.com',
          password: mock_user_one.password,
        });
      } catch (error) {
        expect(error.response).toHaveProperty(
          'message',
          'No user found for email: invalid@mail.com',
        );
        expect(error.response).toHaveProperty('statusCode', 404);
      }
    });
  });
});
