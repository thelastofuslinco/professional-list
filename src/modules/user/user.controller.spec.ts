import {
  mock_user_two,
  mock_user_one,
  setupDataBase,
} from '../../../test/fixtures/db';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const data = await setupDataBase();
    userController = data.userController;
  });

  describe('/users', () => {
    it('should create a new user', async () => {
      const response = await userController.signupUser(mock_user_two);
      const user = await userController.getUserById(response.id);

      expect(user).not.toBeNull();
      expect(response.name).toBe(user.name);
    });

    it('should get existing users', async () => {
      const users = await userController.getUsers();

      expect(users[0].name).toBe(mock_user_one.name);
      expect(users[0].email).toBe(mock_user_one.email);
    });

    it('should get user by id', async () => {
      const user = await userController.getUserById(mock_user_one.id);

      expect(user.name).toBe(mock_user_one.name);
      expect(user.email).toBe(mock_user_one.email);
    });

    it('should update user by id', async () => {
      const newUserData = {
        name: 'New name',
        email: 'newEmail@mail.com',
      };
      const user = await userController.updateUser(
        mock_user_one.id,
        newUserData,
      );

      expect(user.name).toBe(newUserData.name);
      expect(user.email).toBe(newUserData.email);
    });

    it('should delete user by id', async () => {
      const user = await userController.deleteUser(mock_user_one.id);

      expect(user).toBeNull();
    });
  });
});
