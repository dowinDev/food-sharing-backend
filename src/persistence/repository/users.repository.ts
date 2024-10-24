'use strict';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../entity/Users';
import { rolesEnum } from '../../utils/Constants';
import { Accounts } from '../entity/Accounts';

// import { RegisterRequest } from '../dto/register.request';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: typeof Users,
  ) {}

  getHello(): string {
    return 'hello,TDT !!!!!!!';
  }

  async findByUsername(username: string, role: rolesEnum): Promise<Users> {
    return await this.usersModel.findOne({
      where: { userName: username },
      include: [
        {
          model: Accounts,
          where: { role: role },
        },
      ],
    });
  }

  async save(user: Users): Promise<Users> {
    return await this.usersModel.create({
      userName: user.userName,
      password: user.password,
      email: user.email,
    });
  }

  findAll() {
    return this.usersModel.findAll();
  }
}
