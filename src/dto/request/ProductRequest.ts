'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class ProductRequest {
  @ApiProperty()
  nameStore: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  nameProduct: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: string;

  @ApiProperty()
  location: string;
}
