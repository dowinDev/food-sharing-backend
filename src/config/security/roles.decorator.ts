import { SetMetadata } from '@nestjs/common';
import { rolesEnum } from '../../utils/Constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: rolesEnum[]) => SetMetadata(ROLES_KEY, roles);

export const GetUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.id;
  },
);
