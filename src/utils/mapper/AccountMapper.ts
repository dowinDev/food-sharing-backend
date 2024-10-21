'use strict';

import { AuthenticationRequest } from '../../dto/request/AuthenticationRequest';
import { rolesEnum } from '../Constants';

export class AccountMapper {
  static mapToAuthenticate(info: any, role?: rolesEnum) {
    const auth = new AuthenticationRequest();
    auth.userName = info.userName;
    auth.password = info.password;
    auth.role = role;
    return auth;
  }
}
