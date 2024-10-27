'use strict';

import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../persistence/repository/product.repository';
import { ProductRequest } from '../dto/request/ProductRequest';
import { ProductMapper } from '../utils/mapper/ProductMapper';
import { EateryRepository } from '../persistence/repository/eatery.repository';
import { Eatery } from '../persistence/entity/Eaterys';
import { PageData } from '../config/response/page.data';
import { NotFoundException } from '../config/exception/not-found.exception';
import { ProductResponse } from '../dto/response/ProductResponse';
import { ConfigService } from '@nestjs/config';
import logger from '../config/logger';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly eateryRepository: EateryRepository,
    private configService: ConfigService,
  ) {}

  async addProduct(rq: ProductRequest, userId: number, imageUrl: string) {
    try {
      const eatery = new Eatery();
      eatery.nameStore = rq.nameStore;
      eatery.location = rq.location;
      eatery.userId = userId;

      const data = await this.eateryRepository.save(eatery);

      const product = ProductMapper.mapToProduct(rq, data, null, imageUrl);
      await this.productRepository.save(product);
    } catch (error) {
      console.error('Error add product:', error);
      logger.error('Error add product:', error);
      throw error;
    }
  }

  async getAllProducts(
    page: number,
    limit: number,
  ): Promise<PageData<ProductResponse>> {
    try {
      const host = this.configService.get<string>('SV_HOST');
      const port = this.configService.get<number>('SV_PORT');

      const products = await this.productRepository.findAll(page, limit);
      return ProductMapper.mapToPageProduct(products, page, limit, host, port);
    } catch (error) {
      console.error('Error get product', error);
      logger.error('Error get product', error);
      throw error;
    }
  }

  async update(rq: ProductRequest, userId: number, id: number) {
    try {
      const data = await this.productRepository.findById(userId, id);
      if (data == null) {
        throw new NotFoundException();
      }
      const product = ProductMapper.mapToProduct(rq, data);
      await this.productRepository.updateProduct(product, id);
    } catch (error) {
      console.error('Error update product', error);
      logger.error('Error update product', error);
      throw error;
    }
  }

  async delete(id: number, userId: number) {
    try {
      const data = await this.productRepository.findById(userId, id);
      if (data == null) {
        throw new NotFoundException();
      }
      await this.productRepository.deleteProduct(id);
    } catch (error) {
      console.error('Error update product', error);
      logger.error('Error update product', error);
      throw error;
    }
  }

  async getProductsById(id: number, userId: number) {
    try {
      const host = this.configService.get<string>('SV_HOST');
      const port = this.configService.get<number>('SV_PORT');

      const data = await this.productRepository.findByIdAndEatery(userId, id);
      return ProductMapper.mapToProductResponse(data, host, port);
    } catch (error) {
      console.error('Error get product by id', error);
      logger.error('Error get product by id', error);
      throw error;
    }
  }
}
