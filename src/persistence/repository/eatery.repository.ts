import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Eatery } from '../entity/Eaterys';

@Injectable()
export class EateryRepository {
  constructor(
    @InjectModel(Eatery)
    private readonly eateryModel: typeof Eatery,
  ) {}

  async save(eatery: Eatery): Promise<Eatery> {
    return await this.eateryModel.create({
      nameStore: eatery.nameStore,
      location: eatery.location,
      userId: eatery.userId,
    });
  }
}
