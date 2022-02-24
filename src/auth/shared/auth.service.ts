import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getByEmail(email);
    if (user && user.password === password) {
      const { email } = user;
      return { email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
