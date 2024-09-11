import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthDto } from '../auth/dto/auth.dto';
import { result } from './constants/result';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            getByEmail: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            updateAvatar: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      jest.spyOn(service, 'getAll').mockResolvedValue(result as any);

      expect(await controller.getAll()).toBe(result);
    });
  });

  describe('getById', () => {
    it('should return user by id', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(result);

      expect(await controller.getById('1')).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const dto: AuthDto = {
        email: 'test@test.com',
        password: 'password',
        name: 'Test User',
      };

      jest.spyOn(service, 'getByEmail').mockResolvedValue(null);
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
    });

    it('should throw BadRequestException if user already exists', async () => {
      const dto: AuthDto = {
        email: 'test@test.com',
        password: 'password',
        name: 'Test User',
      };
      jest.spyOn(service, 'getByEmail').mockResolvedValue(result);

      await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update user by id', async () => {
      const dto: AuthDto = {
        email: 'updated@test.com',
        password: 'newpassword',
        name: 'Updated User',
      };

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', dto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete user by id', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(result);
      jest.spyOn(service, 'delete').mockResolvedValue(result);

      expect(await controller.delete('1')).toBe(result);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(null);

      await expect(controller.delete('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('uploadAvatar', () => {
    it('should upload avatar and update user avatar', async () => {
      jest.spyOn(service, 'updateAvatar').mockResolvedValue(result);

      const file: Express.Multer.File = { filename: 'avatar-1.png' } as any;

      expect(await controller.uploadAvatar('1', file)).toBe(result);
    });

    it('should throw BadRequestException if file is not uploaded', async () => {
      await expect(controller.uploadAvatar('1', null)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
