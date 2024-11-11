// src/utils/security.utils.ts

import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Users } from '../../persistence/entity/Users';

export class SecurityUtils {
  static getAuthenticatedUser(context: ExecutionContext): Users {
    const request = context.switchToHttp().getRequest<Request>();
    return <Users>request.user; // `request.user` được gán bởi Passport khi người dùng đã xác thực
  }

  static getAuthenticatedUserId(context: ExecutionContext): number {
    const user = this.getAuthenticatedUser(context);
    return user?.id; // Trả về userId
  }
}
