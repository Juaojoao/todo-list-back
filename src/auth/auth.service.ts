import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // async signIn(email: string, password: string) {
  //   const user = await this.userService.findByEmail(email);

  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }

  //   const isPasswordValid = await bcrypt.compare(password, user.password);

  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const payload = { sub: user.id, email: user.email };
  //   const token = this.jwtService.sign(payload);

  //   return { access_token: token };
  // }
}
