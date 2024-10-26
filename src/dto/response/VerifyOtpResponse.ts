'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpResponse {
  @ApiProperty()
  authKey: string;

  @ApiProperty()
  authKeyExpiresAt: number;
}
