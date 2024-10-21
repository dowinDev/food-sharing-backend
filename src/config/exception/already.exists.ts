import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../error-code';

export class AlreadyExistsException extends HttpException {
  constructor(className: string) {
    const errorCode = ErrorCode.ALREADY_EXIST;

    const errorMessage = className + ' already exists';
    super(
      {
        statusCode: errorCode.status,
        errorCode: errorCode.code,
        message: errorMessage,
      },
      errorCode.status,
    );
  }
}
