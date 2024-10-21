import { HttpException, HttpStatus } from '@nestjs/common';

export class NotSupportedException extends HttpException {
  constructor(message: string = 'Operation not supported') {
    super(message, HttpStatus.NOT_IMPLEMENTED);
  }
}
