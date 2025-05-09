import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateAdmin(username: string, password: string) {
    console.log('validateAdmin', process.env.DEFAULT_ADMIN_USERNAME);
    if (
      username === process.env.DEFAULT_ADMIN_USERNAME &&
      password === process.env.DEFAULT_ADMIN_PASSWORD
    ) {
      const payload = { username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
