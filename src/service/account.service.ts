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
import { logger } from 'nestjs-i18n';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly usersRepository: UsersRepository,
    private readonly authenticateService: AuthenticateService,
  ) {}

  getHello(): string {
    return this.usersRepository.getHello();
  }

  async registerUser(
    req: RegisterRequest,
    role: rolesEnum,
  ): Promise<AuthenticationResponse> {
    try {
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
}
