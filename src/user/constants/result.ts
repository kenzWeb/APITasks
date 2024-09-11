import { TaskStatus, UserRole } from '@prisma/client';

export const result = {
  id: '1',
  email: 'test@example.com',
  password: 'hashedpassword',
  name: 'Test User',
  role: UserRole.USER,
  avatar: 'avatar.png',
  createdAt: new Date(),
  updatedAt: new Date(),
  tasks: [
    {
      id: '1',
      title: 'Task 1',
      description: 'Task 1 description',
      status: TaskStatus.IN_PROGRESS,
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};
