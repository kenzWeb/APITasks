import { UserRole } from '@prisma/client';

export const result = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password',
  role: UserRole.USER,
  avatar: '/uploads/avatars/default-icon.png',
  tasks: [],
};
