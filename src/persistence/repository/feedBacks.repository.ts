import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FeedBacks } from '../entity/FeedBacks';
import { Eatery } from '../entity/Eaterys';
import { Users } from '../entity/Users';
import { Products } from '../entity/Products';

@Injectable()
export class FeedBacksRepository {
  constructor(
    @InjectModel(FeedBacks)
    private readonly feedBacksModel: typeof FeedBacks,
  ) {}

  async save(feedBack: FeedBacks) {
    return await this.feedBacksModel.create({
      userId: feedBack.userId,
      productId: feedBack.productId,
      message: feedBack.message,
      rating: feedBack.rating,
    });
  }

  async findById(id: number) {
    return await this.feedBacksModel.findOne({ where: { id: id } });
  }

  async update(feedBack: FeedBacks, id: number) {
    return await this.feedBacksModel.update(
      {
        message: feedBack.message,
        rating: feedBack.rating,
      },
      {
        where: { id: id },
        returning: true,
      },
    );
  }

  async delete(id: number) {
    return await this.feedBacksModel.update(
      { deletedAt: new Date() },
      {
        where: { id: id },
        returning: true,
      },
    );
  }

  async findByEateryId(productId: number, page: number, limit: number) {
    const offset = (page - 1) * limit;

    const { rows: content, count: totalElements } =
      await this.feedBacksModel.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Products,
            attributes: ['id'],
            where: { id: productId },
            include: [
              {
                model: Eatery,
                attributes: ['id', 'nameStore', 'location', 'phone', 'userId'],
              },
            ],
          },
          {
            model: Users,
            attributes: ['userName'],
          },
        ],
      });
    return { content, totalElements };
  }

  async findByUserId(id: number) {
    return this.feedBacksModel.findOne({
      where: { id: id },
      include: [
        {
          model: Users,
          attributes: ['userName'],
        },
        {
          model: Products,
          attributes: ['id', 'eateryId'],
          include: [
            {
              model: Eatery,
              attributes: ['id', 'nameStore', 'location', 'phone', 'userId'],
            },
          ],
        },
      ],
    });
  }
}
