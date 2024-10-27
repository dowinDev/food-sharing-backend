import { Injectable } from '@nestjs/common';
import { AuthPayload } from '../auth-payload';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Accounts } from '../../persistence/entity/Accounts';
import logger from '../logger';
import { ConfigService } from '@nestjs/config';
import { AccountRepository } from '../../persistence/repository/account.repository';

@Injectable()
export class AuthService {
  private authKeyStore = new Map<
    string,
    { authKey: string; expiresAt: number }
  >();
  private refreshTokenStore = new Map<string, string>();

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly accountRepository: AccountRepository,
  ) {}

  //function hash password
  static async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 12);
    } catch (error) {
      logger.error('error hash: ', error);
    }
  }

  //function compare password param with user password in database
  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    try {
      return await bcrypt.compare(password, storePasswordHash);
    } catch (error) {
      logger.error('error compare password : ', error);
    }
  }

  async generateToken(account: Accounts) {
    const payload: AuthPayload = {
      name: account.user.userName,
      id: account.user.id,
      role: account.role,
    };

    return this.jwtService.sign(payload);
  }

  // Generate refresh token
  async generateRefreshToken(account: Accounts): Promise<string> {
    const refreshPayload = {
      id: account.user.id,
      type: 'refresh',
    };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      expiresIn: '7d', // Refresh token có hạn 7 ngày
    });

    // Lưu refresh token vào refreshTokenStore
    this.refreshTokenStore.set(String(account.user.id), refreshToken);

    return refreshToken;
  }

  // Verify refresh token and generate new access token
  async verifyRefreshToken(refreshToken: string): Promise<string> {
    try {
      const decoded = this.jwtService.verify(refreshToken);

      // Kiểm tra nếu token đã hết hạn hoặc không đúng type
      if (decoded.type !== 'refresh') return null;

      // Kiểm tra refresh token trong refreshTokenStore
      const storedToken = this.refreshTokenStore.get(String(decoded.id));
      if (!storedToken || storedToken !== refreshToken) return null;

      const account = await this.accountRepository.findById(decoded.id);
      // Tạo payload mới cho access token
      return await this.generateToken(account);
    } catch (error) {
      logger.error('error verifying refresh token: ', error);
      return null;
    }
  }

  // Xóa refresh token khi user logout hoặc khi cần hủy token
  revokeRefreshToken(userId: number): void {
    this.refreshTokenStore.delete(String(userId));
  }

  saveAuthKey(email: string, authKey: string, expiresAt: number): void {
    this.authKeyStore.set(email, { authKey, expiresAt });
  }

  verifyAuthKey(email: string, authKey: string): boolean {
    const record = this.authKeyStore.get(email);
    if (!record) return false;

    const isExpired = Date.now() > record.expiresAt;
    const isValid = record.authKey === authKey && !isExpired;

    if (isValid || isExpired) {
      this.authKeyStore.delete(email); // Xóa authKey sau khi dùng
    }
    return isValid;
  }
}
