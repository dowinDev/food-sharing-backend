import { Injectable } from '@nestjs/common';
import { AuthPayload } from '../auth-payload';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Accounts } from '../../persistence/entity/Accounts';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  //function hash password
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  //function compare password param with user password in database
  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash);
  }

  async generateToken(account: Accounts) {
    const payload: AuthPayload = {
      name: account.user.userName,
      id: account.user.id,
      role: account.role,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
