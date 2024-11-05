'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../persistence/entity/Users';
import { Products } from '../../persistence/entity/Products';

export class FeedBackResponse {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: Users })
  user: Users = new Users();

  @ApiProperty({ type: Products })
  product: Products = new Products();

  @ApiProperty()
  eateryId: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  rating: number;
}
