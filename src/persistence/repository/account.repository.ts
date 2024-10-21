'use strict';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Accounts } from '../entity/Accounts';
import { Users } from '../entity/Users';
import { rolesEnum } from '../../utils/Constants';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Accounts)
    private readonly accountsModel: typeof Accounts,
  ) {}

  async add(data: Accounts): Promise<Accounts> {
    return Accounts.create(data);
  }

  createAccountForRoleUser(id: number, role: string) {
    return this.accountsModel.create({ userId: id, role: role });
  }

  findAccountByUserName(userName: string, password: string) {
    return this.accountsModel.findOne({
      include: [
        {
          model: Users,
          where: {
            password: password,
            userName: userName,
          },
        },
      ],
    });
  }

  async findByUsername(username: string, role: rolesEnum) {
    return this.accountsModel.findOne({
      where: {
        role: role,
      },
      include: [
        {
          model: Users,
          where: {
            userName: username,
          },
        },
      ],
    });
  }
}
