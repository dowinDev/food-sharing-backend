'use strict';

import { Injectable } from '@nestjs/common';
// import { UsersRepository } from '../persistence/repository/users.repository';
import { AuthenticationRequest } from '../dto/request/AuthenticationRequest';
import { AccountRepository } from '../persistence/repository/account.repository';
import { AuthService } from '../config/security/auth.service';

@Injectable()
export class AuthenticateService {
  constructor(
    //private readonly usersRepository: UsersRepository,
    private readonly accountRepository: AccountRepository,
    private readonly authService: AuthService,
  ) {}

  async authenticate(rq: AuthenticationRequest): Promise<any> {
    const account = await this.accountRepository.findByUsername(
      rq.userName,
      rq.role,
    );
    const check = await this.authService.comparePassword(
      rq.password,
      account.user.password,
    );

    if (!account || !check) {
      return false;
    }

    return this.authService.generateToken(account);
  }
}
