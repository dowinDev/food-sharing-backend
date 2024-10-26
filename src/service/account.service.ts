'use strict';

import { AccountRepository } from '../persistence/repository/account.repository';
import { UsersRepository } from '../persistence/repository/users.repository';
import { Injectable } from '@nestjs/common';
import { RegisterRequest } from '../dto/request/RegisterRequest';
import { rolesEnum } from '../utils/Constants';
import { UsersMapper } from '../utils/mapper/UsersMapper';
import { AuthenticationResponse } from '../dto/response/AuthenticationResponse';
import { AuthenticateService } from './authenticate.service';
import { AccountMapper } from '../utils/mapper/AccountMapper';
import { AlreadyExistsException } from '../config/exception/already.exists';
import { AuthenticationRequest } from '../dto/request/AuthenticationRequest';
import logger from '../config/logger';
import { OtpConfig } from '../config/otp.config';
import { EmailConfig } from '../config/email.config';
import randomatic from 'randomatic';
import { VerifyOtpResponse } from '../dto/response/VerifyOtpResponse';
import { AuthService } from '../config/security/auth.service';
import { OtpInvalidException } from '../config/exception/otp-invalid.exception';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly usersRepository: UsersRepository,
    private readonly authenticateService: AuthenticateService,
    private readonly authService: AuthService,
    private readonly otpConfig: OtpConfig,
    private readonly emailConfig: EmailConfig,
  ) {}

  getHello(): string {
    return this.usersRepository.getHello();
  }

  async registerUser(
    req: RegisterRequest,
    role: rolesEnum,
  ): Promise<AuthenticationResponse> {
    try {
      const isValidAuthKey = this.authService.verifyAuthKey(
        req.email,
        req.authKey,
      );

      if (isValidAuthKey) {
        const users = await this.usersRepository.findByUsername(
          req.userName,
          role,
        );
        if (!users) {
          const user = UsersMapper.mapToAccount(req);
          const userData = await this.usersRepository.save(await user);
          await this.accountRepository.createAccountForRoleUser(
            userData.id,
            role,
          );
          return await this.authenticateService.authenticate(
            AccountMapper.mapToAuthenticate(req, role),
          );
        } else {
          throw new AlreadyExistsException(req.userName);
        }
      } else {
        throw new OtpInvalidException();
      }
    } catch (error) {
      console.error('Error during user registration:', error);
      logger.error('Error during user registration:', error);
      throw error;
    }
  }

  async login(rq: AuthenticationRequest, role: rolesEnum) {
    try {
      return await this.authenticateService.authenticate(
        AccountMapper.mapToAuthenticate(rq, role),
      );
    } catch (error) {
      console.error('Error during user login:', error);
      logger.error('Error during user login:', error);
      throw error;
    }
  }

  async sendOTP(email: string) {
    const otp = this.otpConfig.generateOTP();
    this.otpConfig.saveOtp(email, otp);
    await this.emailConfig.sendOTP(email, otp);
  }

  async verifyOTP(email: string, otp: string) {
    try {
      const verify = new VerifyOtpResponse();
      const isValid = this.otpConfig.verifyOtp(email, otp);
      if (isValid) {
        verify.authKey = randomatic('A', 5); // Tạo mã 5 chữ cái ngẫu nhiên
        verify.authKeyExpiresAt = Date.now() + 10 * 1000; // Hết hạn trong 10 giây
        this.authService.saveAuthKey(
          email,
          verify.authKey,
          verify.authKeyExpiresAt,
        );

        return verify;
      } else {
        throw new OtpInvalidException('Mã OTP không hợp lệ hoặc đã hết hạn');
      }
    } catch (error) {
      console.error('Error verify otp', error);
      logger.error('Error verify otp:', error);
      throw error;
    }
  }
}
