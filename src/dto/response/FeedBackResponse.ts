'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../../persistence/entity/Users';
import { Eatery } from '../../persistence/entity/Eaterys';

export class FeedBackResponse {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: Users })
  user: Users = new Users();

  @ApiProperty({ type: Eatery })
  eatery: Eatery = new Eatery();

  @ApiProperty()
  eateryId: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  rating: number;
}
