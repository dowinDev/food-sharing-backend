import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectPasswordException extends HttpException {
  constructor(message: string = 'Incorrect password provided') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
