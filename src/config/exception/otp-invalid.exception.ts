import { HttpException, HttpStatus } from '@nestjs/common';

export class OtpInvalidException extends HttpException {
  constructor(message: string = 'Invalid OTP code') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
