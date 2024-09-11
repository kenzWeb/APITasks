import { UserRole } from '@prisma/client';

export const result = {
  accessToken: 'access_token',
  refreshToken: 'new_refresh_token',
  user: {
    id: '1',
    email: 'john@example.com',
    password: 'password',
    name: 'John Doe',
    role: UserRole.USER,
    avatar: '/uploads/avatars/default-icon.png',
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const user = {
  id: '1',
  email: 'test@example.com',
  password: 'hashedpassword',
  name: 'Test User',
  role: UserRole.USER,
  avatar: 'avatar.png',
  tasks: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
