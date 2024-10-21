'use strict';

import { Users } from '../../persistence/entity/Users';
import { RegisterRequest } from '../../dto/request/RegisterRequest';
import { AuthService } from '../../config/security/auth.service';

export class UsersMapper {
  constructor(private readonly authService: AuthService) {}

  static async mapToAccount(req: RegisterRequest) {
    const passwordHash = AuthService.hashPassword(req.password);
    const user = new Users();
    user.userName = req.userName;
    user.password = await passwordHash;
    user.email = req.email;

    return user;
  }
}
