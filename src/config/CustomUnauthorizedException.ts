import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomUnauthorizedException extends HttpException {
  constructor(code: string, message: string) {
    super(
      {
        code,
        status: HttpStatus.FORBIDDEN,
        message,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
