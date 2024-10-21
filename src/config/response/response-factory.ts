import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorCode } from '../error-code';
import { ResponseWrapper } from './response-wrapper';
// import { I18nService } from 'nestjs-i18n';
import _ from 'lodash';
import { I18nService } from '../I18nService';

@Injectable()
export class ResponseFactory {
  static instance: ResponseFactory = new ResponseFactory(new I18nService());

  constructor(private readonly i18n: I18nService) {}

  getErrorCodeMessageKey(errorCode: ErrorCode): string {
    return this.getErrorCodeMessageKeyByCode(errorCode.code);
  }

  private getErrorCodeMessageKeyByCode(code: string): string {
    return `${code}`;
  }

  private getMessage(errorCode: ErrorCode, ...args: string[]): string {
    const messageKey = this.getErrorCodeMessageKey(errorCode);
    return this.i18n.getMessage(messageKey, ...args);
  }

  successFactory<T>(data?: T): ResponseWrapper<T> {
    return new ResponseWrapper<T>({
      status: HttpStatus.OK,
      code: ErrorCode.SUCCESS.code,
      message: this.getMessage(ErrorCode.SUCCESS),
      data: data,
    });
  }

  error(): ResponseWrapper<void> {
    return new ResponseWrapper<void>({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: this.getMessage(ErrorCode.FAILED),
    });
  }

  errorWithErrorCode(errorCode: ErrorCode): ResponseWrapper<void> {
    return new ResponseWrapper<void>({
      status: errorCode.status || HttpStatus.INTERNAL_SERVER_ERROR,
      code: errorCode.code,
      message: this.getMessage(errorCode),
    });
  }

  errorWithArgs(
    errorCode: ErrorCode,
    ...args: string[]
  ): ResponseWrapper<void> {
    return new ResponseWrapper<void>({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: errorCode.code,
      message: this.getMessage(errorCode, ...args),
    });
  }

  errorWithCustomMsg(message: string): ResponseWrapper<void> {
    return new ResponseWrapper<void>({
      status: HttpStatus.BAD_REQUEST,
      code: ErrorCode.INVALID_INPUT.code,
      message: message,
    });
  }

  errorWithCustomMsgAndCode(
    errorCode: ErrorCode,
    message: string,
  ): ResponseWrapper<void> {
    return new ResponseWrapper<void>({
      status: errorCode.status || HttpStatus.INTERNAL_SERVER_ERROR,
      code: errorCode.code,
      message: message,
    });
  }

  errorWithCustomMsgAndArgs(
    errorCode: ErrorCode,
    message: string,
    ...args: string[]
  ): ResponseWrapper<void> {
    let finalMessage: string;

    if (args && args.length > 0) {
      finalMessage = _.isEmpty(message)
        ? this.getMessage(errorCode, ...args)
        : message;
    } else {
      finalMessage = _.isEmpty(message) ? this.getMessage(errorCode) : message;
    }

    return new ResponseWrapper<void>({
      status: errorCode.status || HttpStatus.INTERNAL_SERVER_ERROR,
      code: errorCode.code,
      message: finalMessage,
    });
  }
}
