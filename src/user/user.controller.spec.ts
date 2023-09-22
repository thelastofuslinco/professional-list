import { Test, TestingModule } from '@nestjs/testing';
import { mock_user_two, mock_user_one } from '../../test/fixtures/db';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UserController', () => {
  let userController: UserController;
  let userId = '';

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    const userService = app.get<UserService>(UserService);
    await userService.deleteUsers();
    const { id } = await userService.createUser(mock_user_one);
    userController = app.get<UserController>(UserController);
    userId = id;
  });

  describe('/users', () => {
    it('should create a new user', async () => {
      const response = await userController.signupUser(mock_user_two);
      const user = await userController.getUserById(response.id);

      expect(user).not.toBeNull();
      expect(response.name).toBe(user.name);
    });

    it('should not create an existing user', async () => {
      try {
        await userController.signupUser(mock_user_one);
      } catch (error) {
        expect(error).toHaveProperty('code', 'P2002');
      }
    });

    it('should get existing users', async () => {
      const users = await userController.getUsers();

      expect(users[0].name).toBe(mock_user_one.name);
      expect(users[0].email).toBe(mock_user_one.email);
    });

    it('should get user by id', async () => {
      const user = await userController.getUserById(userId);

      expect(user.name).toBe(mock_user_one.name);
      expect(user.email).toBe(mock_user_one.email);
    });

    it('should not get non-existent user', async () => {
      try {
        await userController.getUserById('invalid_id');
      } catch (error) {
        expect(error.response).toHaveProperty(
          'message',
          'User invalid_id does not exist.',
        );
        expect(error.response).toHaveProperty('statusCode', 404);
      }
    });

    it('should update user by id', async () => {
      const newUserData = {
        name: 'New name',
        email: 'newEmail@mail.com',
        password: '12345678NewPassword',
      };
      const user = await userController.updateUser(userId, newUserData);

      expect(user.name).toBe(newUserData.name);
      expect(user.email).toBe(newUserData.email);
    });

    it('should delete user by id', async () => {
      const user = await userController.deleteUser(userId);

      expect(user.name).toBe(mock_user_one.name);
      expect(user.email).toBe(mock_user_one.email);
    });
  });
});
