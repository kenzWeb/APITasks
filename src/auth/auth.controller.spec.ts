import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { result } from './constants/constants';
import { AuthDto } from './dto/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
            getNewTokens: jest.fn(),
            addRefreshTokenToResponse: jest.fn(),
            removeRefreshTokenFromResponse: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should login and return response', async () => {
      const dto: AuthDto = {
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      };
      const res: Partial<Response> = { cookie: jest.fn() };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await controller.login(dto, res as Response)).toEqual({
        accessToken: 'access_token',
        user: result.user,
      });
      expect(authService.addRefreshTokenToResponse).toHaveBeenCalledWith(
        res,
        'new_refresh_token',
      );
    });
  });

  describe('register', () => {
    it('should register and return response', async () => {
      const dto: AuthDto = {
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      };
      const res: Partial<Response> = { cookie: jest.fn() };

      jest.spyOn(authService, 'register').mockResolvedValue(result);

      expect(await controller.register(dto, res as Response)).toEqual({
        accessToken: 'access_token',
        user: result.user,
      });
      expect(authService.addRefreshTokenToResponse).toHaveBeenCalledWith(
        res,
        'new_refresh_token',
      );
    });
  });

  describe('logout', () => {
    it('should logout and return true', async () => {
      const res: Partial<Response> = { cookie: jest.fn() };

      expect(await controller.logout(res as Response)).toEqual(true);
      expect(authService.removeRefreshTokenFromResponse).toHaveBeenCalledWith(
        res,
      );
    });
  });
});
