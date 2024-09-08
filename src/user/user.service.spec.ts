import { Test, TestingModule } from '@nestjs/testing';
import { AuthDto } from '../auth/dto/auth.dto';
import { PrismaService } from '../prisma.service';
import { result } from './constants/result';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(result as any);

      expect(await service.getAll({})).toBe(result);
    });
  });

  describe('getById', () => {
    it('should return user by id', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(result);

      expect(await service.getById('1')).toBe(result);
    });
  });

  describe('getByEmail', () => {
    it('should return user by email', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(result);

      expect(await service.getByEmail('test@test.com')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const dto: AuthDto = {
        email: 'test@test.com',
        password: 'password',
        name: 'Test User',
      };

      const mockCreate = jest.spyOn(prisma.user, 'create') as jest.Mock;

      mockCreate.mockResolvedValue(result);

      expect(await service.create(dto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update user by id', async () => {
      const dto: AuthDto = {
        email: 'updated@test.com',
        password: 'newpassword',
        name: 'Updated User',
      };

      jest.spyOn(prisma.user, 'update').mockResolvedValue(result);

      expect(await service.update('1', dto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete user by id', async () => {
      jest.spyOn(prisma.user, 'delete').mockResolvedValue(result);

      expect(await service.delete('1')).toBe(result);
    });
  });

  describe('updateAvatar', () => {
    it('should update user avatar', async () => {
      jest.spyOn(prisma.user, 'update').mockResolvedValue(result);

      expect(
        await service.updateAvatar('1', '/uploads/avatars/avatar-1.png'),
      ).toBe(result);
    });
  });
});
