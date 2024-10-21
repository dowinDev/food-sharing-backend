import { ResponseFactory } from './response-factory';
import { ErrorCode } from '../error-code';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseWrapper<T> {
  code?: string;
  status?: number;
  message?: string;
  data?: T | null;

  constructor(init?: Partial<ResponseWrapper<T>>) {
    Object.assign(this, init);
  }

  static success<T>(data?: T): ResponseWrapper<T> {
    return ResponseFactory.instance.successFactory(data);
  }

  static error(): ResponseWrapper<void> {
    return ResponseFactory.instance.error();
  }

  static errorWithErrorCode(errorCode: ErrorCode): ResponseWrapper<void> {
    return ResponseFactory.instance.errorWithErrorCode(errorCode);
  }

  static errorWithCustomMsg(msg: string): ResponseWrapper<void> {
    return ResponseFactory.instance.errorWithCustomMsg(msg);
  }

  static errorWithCustomMsgAndCode(
    errorCode: ErrorCode,
    msg: string,
  ): ResponseWrapper<void> {
    return ResponseFactory.instance.errorWithCustomMsgAndCode(errorCode, msg);
  }

  static errorWithArgs(
    errorCode: ErrorCode,
    msg: string,
    args: string[],
  ): ResponseWrapper<void> {
    return ResponseFactory.instance.errorWithCustomMsgAndArgs(
      errorCode,
      msg,
      ...args,
    );
  }
}
