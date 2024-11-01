import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Products } from '../entity/Products';
import { Eatery } from '../entity/Eaterys';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Products)
    private readonly productsModel: typeof Products,
  ) {}

  async save(product: Products): Promise<Products> {
    return await this.productsModel.create({
      nameProduct: product.nameProduct,
      contact: product.contact,
      quantity: product.quantity,
      price: product.price,
      eateryId: product.eateryId,
      image: product.image,
    });
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const { rows: content, count: totalElements } =
      await this.productsModel.findAndCountAll({
        limit,
        offset,
        include: {
          model: Eatery,
          attributes: ['location', 'nameStore'],
        },
      });
    return { content, totalElements };
  }

  async findById(userId: number, id: number): Promise<Products> {
    return await this.productsModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateProduct(data: Products, id: number) {
    return await this.productsModel.update(
      {
        nameProduct: data.nameProduct,
        price: data.price,
        quantity: data.quantity,
        image: data.image,
        contact: data.contact,
        eateryId: data.eateryId,
      },
      {
        where: { id: id },
        returning: true,
      },
    );
  }

  async deleteProduct(id: number) {
    return await this.productsModel.update(
      { deletedAt: new Date() },
      {
        where: { id: id },
        returning: true,
      },
    );
  }

  async findByIdAndEatery(userId: number, id: number): Promise<Products> {
    return await this.productsModel.findOne({
      where: {
        id: id,
      },
      include: {
        model: Eatery,
        attributes: ['id', 'nameStore', 'location'],
      },
    });
  }
}
