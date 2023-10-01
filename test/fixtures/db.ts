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
  authenticated_at: null,
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
  authenticated_at: null,
};
