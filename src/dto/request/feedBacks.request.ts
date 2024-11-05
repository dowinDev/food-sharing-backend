'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class FeedBacksRequest {
  @ApiProperty()
  message: string;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  productId: number;
}
