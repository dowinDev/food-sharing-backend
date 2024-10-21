'use strict';

import { ProductRequest } from '../../dto/request/ProductRequest';
import { Products } from '../../persistence/entity/Products';
import { ProductResponse } from '../../dto/response/ProductResponse';
import { PageData } from '../../config/response/page.data';
import { Eatery } from '../../persistence/entity/Eaterys';

export class ProductMapper {
  static mapToProduct(
    rq: ProductRequest,
    data?: any,
    current?: Products,
    image?: string,
  ) {
    const product = new Products();
    product.nameProduct = rq.nameProduct;
    product.quantity = rq.quantity;
    product.price = rq.price;
    product.image = image;
    product.contact = rq.phone;
    product.eateryId = data.id || current.eateryId;
    return product;
  }

  static mapToProductResponse(rq: Products, host: string, port: number) {
    const response = new ProductResponse();
    response.id = rq.id;
    response.nameProduct = rq.nameProduct;
    response.contact = rq.contact;
    response.description = rq.description;
    response.image = `http://${host}:${port}/public/images/` + rq.image;
    response.price = rq.price;
    response.expirationDate = rq.expirationDate;
    response.eatery = rq.eatery;
    response.quantity = rq.quantity;
    return response;
  }

  static mapToPageProduct(
    products: any,
    page: number,
    limit: number,
    host: string,
    port: number,
  ): PageData<ProductResponse> {
    const arrData: ProductResponse[] = [];

    if (products.content.length === 0) {
      return PageData.empty<Products>();
    }

    products.content.forEach(function (item: {
      id: number;
      eatery: Eatery;
      nameProduct: string;
      contact: string;
      price: string;
      image: string;
      quantity: number;
      expirationDate: Date;
      description: string;
    }) {
      const data = new ProductResponse();

      data.id = item.id;
      data.eatery = item.eatery;
      data.nameProduct = item.nameProduct;
      data.contact = item.contact;
      data.price = item.price;
      data.image = `http://${host}:${port}/public/images/` + item.image;
      data.quantity = item.quantity;
      data.expirationDate = item.expirationDate;
      data.description = item.description;

      arrData.push(data);
    });

    return PageData.create(arrData, products.totalElements, page, limit);
  }
}
