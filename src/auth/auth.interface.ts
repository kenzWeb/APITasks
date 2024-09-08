import { UserRole } from '@prisma/client';

export type Typerole = 'admin' | 'user';

export const user = {
  id: '1',
  email: 'test@example.com',
  password: 'hashedpassword',
  name: 'Test User',
  role: UserRole.USER,
  avatar: 'avatar.png',
  tasks: [],
};
