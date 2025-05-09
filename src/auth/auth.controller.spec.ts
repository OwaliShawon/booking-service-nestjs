import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      validateAdmin: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
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
    it('should call AuthService.validateAdmin and return a token', async () => {
      const mockLoginDto = { username: 'admin', password: 'password' };
      const mockToken = { access_token: 'mockToken' };

      jest.spyOn(authService, 'validateAdmin').mockResolvedValue(mockToken);

      const result = await controller.login(mockLoginDto);

      expect(authService.validateAdmin).toHaveBeenCalledWith(
        mockLoginDto.username,
        mockLoginDto.password,
      );
      expect(result).toEqual(mockToken);
    });
  });
});
