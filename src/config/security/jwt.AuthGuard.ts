import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { Request } from 'express';
import { ErrorCode } from '../error-code';
import { CustomUnauthorizedException } from '../CustomUnauthorizedException';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new CustomUnauthorizedException(
        ErrorCode.ACCESS_DENIED.code,
        'ACCESS DENIED',
      );
    }

    let user: any;
    try {
      user = this.jwtService.verify(token);
      request.user = user;
    } catch (error) {
      console.error(error);
      throw new CustomUnauthorizedException(
        ErrorCode.UNAUTHORIZED.code,
        'Token has expired',
      );
    }

    return requiredRoles.some((role) => user.role?.includes(role));
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.slice(7);
    }
    return null;
  }
}
