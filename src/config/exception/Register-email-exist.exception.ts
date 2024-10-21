import { HttpException, HttpStatus } from '@nestjs/common';

export class RegisterEmailExistException extends HttpException {
  constructor(message: string = 'Email already registered') {
    super(message, HttpStatus.CONFLICT);
  }
}
