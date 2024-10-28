'use strict';

import { Injectable } from '@nestjs/common';
// import { UsersRepository } from '../persistence/repository/users.repository';
import { AuthenticationRequest } from '../dto/request/AuthenticationRequest';
import { AccountRepository } from '../persistence/repository/account.repository';
import { AuthService } from '../config/security/auth.service';
import { AuthenticationResponse } from '../dto/response/AuthenticationResponse';
import { NotFoundException } from '../config/exception/not-found.exception';
import logger from '../config/logger';

@Injectable()
export class AuthenticateService {
  constructor(
    //private readonly usersRepository: UsersRepository,
    private readonly accountRepository: AccountRepository,
    private readonly authService: AuthService,
  ) {}

  async authenticate(rq: AuthenticationRequest): Promise<any> {
    const authentication = new AuthenticationResponse();
    const account = await this.accountRepository.findByUsername(
      rq.userName,
      rq.role,
    );
    try {
      const check = await this.authService.comparePassword(
        rq.password,
        account.user.password,
      );
      if (!check) {
        throw new NotFoundException('account invalid');
      }
    } catch (e) {
      console.error(e);
      throw new NotFoundException('account invalid');
    }

    authentication.token = await this.authService.generateToken(account);
    authentication.refreshToken =
      await this.authService.generateRefreshToken(account);

    return authentication;
  }
}
