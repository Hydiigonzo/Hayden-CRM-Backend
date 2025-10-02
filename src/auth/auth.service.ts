import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  // User registration
  async register(email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
    return this.userService.create(email, password); // Pass raw password ONLY
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    console.log('Fetched user:', user);
    if (!user) return null;
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch); 
    return passwordMatch ? user : null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
