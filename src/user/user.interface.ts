import { UserRole } from '@prisma/client';

export default interface Result {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar: string;
}
