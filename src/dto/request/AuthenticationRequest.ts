'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { rolesEnum } from '../../utils/Constants';

export class AuthenticationRequest {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;

  role: rolesEnum;
}
