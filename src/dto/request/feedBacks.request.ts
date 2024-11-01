'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class FeedBacksRequest {
  @ApiProperty()
  eateryId: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  rating: number;
}
