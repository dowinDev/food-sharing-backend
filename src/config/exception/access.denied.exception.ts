import { HttpException, HttpStatus } from '@nestjs/common';

export class AccessDeniedException extends HttpException {
  constructor(message: string = 'Access Denied') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
