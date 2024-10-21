import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidInputException extends HttpException {
  constructor(message: string = 'Invalid input data') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
