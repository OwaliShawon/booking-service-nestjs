import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mockToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateAdmin', () => {
    it('should return a token if credentials are valid', async () => {
      process.env.DEFAULT_ADMIN_USERNAME = 'admin';
      process.env.DEFAULT_ADMIN_PASSWORD = 'password';

      const result = await service.validateAdmin('admin', 'password');

      expect(result).toEqual({ access_token: 'mockToken' });
      expect(jwtService.sign).toHaveBeenCalledWith({ username: 'admin' });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      process.env.DEFAULT_ADMIN_USERNAME = 'admin';
      process.env.DEFAULT_ADMIN_PASSWORD = 'password';

      await expect(
        service.validateAdmin('wrongUser', 'wrongPassword'),
      ).rejects.toThrow(UnauthorizedException); // Fixed here
    });
  });
});
