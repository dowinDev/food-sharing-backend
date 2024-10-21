'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { Eatery } from '../../persistence/entity/Eaterys';

export class ProductResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nameProduct: string;

  @ApiProperty()
  expirationDate: Date;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ type: Eatery })
  eatery: Eatery = new Eatery();
}
