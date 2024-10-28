import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../error-code'; // Đảm bảo đường dẫn chính xác tới file ErrorCode

export class NotFoundException extends HttpException {
  constructor();
  constructor(errorMessage: string);
  constructor(className: string, identifier: string);
  constructor(classNameOrMessage?: string, identifier?: string) {
    const errorCode = ErrorCode.NOT_FOUND; // Sử dụng ErrorCode.NOT_FOUND từ ErrorCode class
    let errorMessage: string;

    if (!classNameOrMessage) {
      errorMessage = 'Resource not found';
    } else if (!identifier) {
      errorMessage = classNameOrMessage;
    } else {
      errorMessage = `${classNameOrMessage} with identifier ${identifier} not found`;
    }

    super(
      {
        code: errorCode.code,
        status: errorCode.status,
        message: errorMessage,
      },
      errorCode.status,
    );
  }
}
