import { HttpStatus } from '@nestjs/common';

export class ErrorCode {
  static readonly SUCCESS = new ErrorCode('00', HttpStatus.OK);
  static readonly FAILED = new ErrorCode(
    '01',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );

  // Server side error - prefix "S"
  // Authentication error - prefix "A"
  static readonly ACCESS_DENIED = new ErrorCode('SA01', HttpStatus.FORBIDDEN);
  static readonly OTP_INVALID = new ErrorCode('SA02', HttpStatus.BAD_REQUEST);
  static readonly OTP_EXPIRED = new ErrorCode('SA03', HttpStatus.UNAUTHORIZED);
  static readonly INVALID_GOOGLE_TOKEN = new ErrorCode(
    'SA04',
    HttpStatus.UNAUTHORIZED,
  );
  static readonly INVALID_GOOGLE_IDENTITY = new ErrorCode(
    'SA05',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  static readonly APPLE_KEY_ID_NOT_FOUND = new ErrorCode(
    'SA06',
    HttpStatus.BAD_REQUEST,
  );
  static readonly APPLE_KEY_VERIFICATION_FAILED = new ErrorCode(
    'SA07',
    HttpStatus.UNAUTHORIZED,
  );
  static readonly APPLE_TOKEN_EXPIRED = new ErrorCode(
    'SA08',
    HttpStatus.UNAUTHORIZED,
  );
  static readonly APPLE_TOKEN_PARSE_ERROR = new ErrorCode(
    'SA09',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  static readonly LOCKED_ACCOUNT = new ErrorCode(
    'SA10',
    HttpStatus.UNAUTHORIZED,
  );
  static readonly UNAUTHORIZED = new ErrorCode('SA11', HttpStatus.UNAUTHORIZED);

  // Business error - prefix "B"
  static readonly NOT_FOUND = new ErrorCode('SB01', HttpStatus.NOT_FOUND);
  static readonly ALREADY_EXIST = new ErrorCode('SB02', HttpStatus.CONFLICT);
  static readonly INVALID = new ErrorCode(
    'SB03',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
  static readonly NOT_SUPPORTED = new ErrorCode('SB04', HttpStatus.BAD_REQUEST);

  // Validation error - prefix "V"
  static readonly INVALID_INPUT = new ErrorCode('SV01', HttpStatus.BAD_REQUEST);
  static readonly MISSING_PARAM = new ErrorCode('SV02', HttpStatus.BAD_REQUEST);
  static readonly INVALID_PHONE_NUMBER = new ErrorCode(
    'SV03',
    HttpStatus.BAD_REQUEST,
  );

  // Common errors
  static readonly MISSING_PARAMETERS = new ErrorCode(
    'MSG01',
    HttpStatus.BAD_REQUEST,
  );

  // API-related errors (Authentication)
  static readonly WRONG_PW_ATTEMPT_1 = new ErrorCode(
    'MSG1201',
    HttpStatus.CONFLICT,
  );
  static readonly WRONG_PW_ATTEMPT_2 = new ErrorCode(
    'MSG1202',
    HttpStatus.CONFLICT,
  );
  static readonly WRONG_PW_ATTEMPT_3 = new ErrorCode(
    'MSG1203',
    HttpStatus.CONFLICT,
  );
  static readonly WRONG_PW_ATTEMPT_4 = new ErrorCode(
    'MSG1204',
    HttpStatus.CONFLICT,
  );
  static readonly WRONG_PW_ATTEMPT_5 = new ErrorCode(
    'MSG1205',
    HttpStatus.CONFLICT,
  );

  // Signup errors
  static readonly OTP_CODE_INVALID_OR_EXPIRED = new ErrorCode(
    'MSG1101',
    HttpStatus.BAD_REQUEST,
  );
  static readonly PASSCODE_NOT_MATCH = new ErrorCode(
    'MSG1102',
    HttpStatus.BAD_REQUEST,
  );
  static readonly EMAIL_EXISTED = new ErrorCode('MSG1103', HttpStatus.CONFLICT);
  static readonly INVALID_EMAIL = new ErrorCode(
    'MSG1104',
    HttpStatus.BAD_REQUEST,
  );
  static readonly REQUIRED_FIELD_NOT_NULL = new ErrorCode(
    'MSG1105',
    HttpStatus.BAD_REQUEST,
  );
  static readonly PHONE_EXISTED = new ErrorCode('MSG1106', HttpStatus.CONFLICT);

  // Reset password errors
  static readonly RESET_PASSWORD_OTP_CODE = new ErrorCode(
    'MSG1301',
    HttpStatus.BAD_REQUEST,
  );

  // Appointment errors
  static readonly MAX_BOOKING_APPOINTMENT = new ErrorCode(
    'MSG9999',
    HttpStatus.BAD_REQUEST,
  );
  static readonly MAX_PEOPLE_IN_SLOT = new ErrorCode(
    'MSG9998',
    HttpStatus.BAD_REQUEST,
  );
  static readonly APPOINTMENT_EXISTED = new ErrorCode(
    'MSG9997',
    HttpStatus.BAD_REQUEST,
  );
  static readonly WORK_HOURS_NOT_FOUND = new ErrorCode(
    'MSG9996',
    HttpStatus.BAD_REQUEST,
  );
  static readonly DAY_OFF = new ErrorCode('MSG8999', HttpStatus.BAD_REQUEST);
  static readonly WALK_IN_USER_TIME_SLOT_NOT_AVAILABLE = new ErrorCode(
    'MSG8000',
    HttpStatus.BAD_REQUEST,
  );

  // Voucher errors
  static readonly NOT_ENOUGH_POINT = new ErrorCode(
    'MSG9995',
    HttpStatus.BAD_REQUEST,
  );
  static readonly VOUCHER_REDEEMED = new ErrorCode(
    'MSG9994',
    HttpStatus.BAD_REQUEST,
  );
  static readonly VOUCHER_EXPIRED = new ErrorCode(
    'MSG9993',
    HttpStatus.BAD_REQUEST,
  );
  static readonly VOUCHER_OUT_OF_STOCK = new ErrorCode(
    'MSG9992',
    HttpStatus.BAD_REQUEST,
  );
  static readonly VOUCHER_USED = new ErrorCode(
    'MSG9991',
    HttpStatus.BAD_REQUEST,
  );
  static readonly NOT_REDEEM_VOUCHER = new ErrorCode(
    'MSG9990',
    HttpStatus.BAD_REQUEST,
  );

  // Refresh token errors
  static readonly INVALID_REFRESH_TOKEN = new ErrorCode(
    'MSG1401',
    HttpStatus.BAD_REQUEST,
  );

  // Announcement errors
  static readonly CANT_UPDATE_ANNOUNCEMENT = new ErrorCode(
    'MSG1501',
    HttpStatus.BAD_REQUEST,
  );

  private constructor(
    public readonly code: string,
    public readonly status: HttpStatus,
  ) {}
}
