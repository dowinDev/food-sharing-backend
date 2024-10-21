'use strict';

import { ApiProperty } from "@nestjs/swagger";

export class OTPRequest{
    @ApiProperty()
    otp: string;
}