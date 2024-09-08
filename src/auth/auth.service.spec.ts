import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { user } from './auth.interface';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
            verifyAsync: jest.fn().mockResolvedValue({ id: 'user-id' }),
          },
        },
        {
          provide: UserService,
          useValue: {
            getByEmail: jest.fn(),
            create: jest.fn(),
            getById: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('localhost'),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should login a user', async () => {
      const dto: AuthDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(service, 'validateUser').mockResolvedValue(user);
      jest.spyOn(service, 'issueTokens').mockReturnValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      expect(await service.login(dto)).toEqual({
        user,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });
  });

  describe('register', () => {
    it('should register a user', async () => {
      const dto: AuthDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(userService, 'getByEmail').mockResolvedValue(null);
      jest.spyOn(userService, 'create').mockResolvedValue(user);
      jest.spyOn(service, 'issueTokens').mockReturnValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      expect(await service.register(dto)).toEqual({
        user,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });

    it('should throw an error if user already exists', async () => {
      const dto: AuthDto = {
        name: 'test',
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(userService, 'getByEmail').mockResolvedValue(user);

      await expect(service.register(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('getNewTokens', () => {
    it('should return new tokens', async () => {
      jest.spyOn(userService, 'getById').mockResolvedValue(user);
      jest.spyOn(service, 'issueTokens').mockReturnValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      expect(await service.getNewTokens('refreshToken')).toEqual({
        user,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });

    it('should throw an error if token is invalid', async () => {
      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockRejectedValue(new UnauthorizedException());

      await expect(service.getNewTokens('invalidToken')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('validateOAuthLogin', () => {
    it('should create a new user if not exists', async () => {
      const req = {
        user: {
          email: 'test@example.com',
          name: 'Test User',
          avatar: 'avatar.png',
        },
      };

      jest.spyOn(userService, 'getByEmail').mockResolvedValue(null);
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(user);
      jest.spyOn(service, 'issueTokens').mockReturnValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      expect(await service.validateOAuthLogin(req)).toEqual({
        user,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });

    it('should return existing user if exists', async () => {
      const req = {
        user: {
          email: 'test@example.com',
          name: 'Test User',
          avatar: 'avatar.png',
        },
      };

      jest.spyOn(userService, 'getByEmail').mockResolvedValue(user);
      jest.spyOn(service, 'issueTokens').mockReturnValue({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });

      expect(await service.validateOAuthLogin(req)).toEqual({
        user,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });
  });
});
