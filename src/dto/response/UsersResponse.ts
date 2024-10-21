'use strict';

import { rolesEnum } from '../../utils/Constants';

class UsersResponse {
  private id: number;
  private username: string;
  private email: string;
  private phone: string;
  private role: rolesEnum;

  constructor(
    id: number,
    username: string,
    email: string,
    phone: string,
    role: rolesEnum,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.role = role;
  }
}

module.exports = UsersResponse;
