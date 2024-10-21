'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationResponse {
  @ApiProperty()
  token: string;
  @ApiProperty()
  refreshToken: string;
}
