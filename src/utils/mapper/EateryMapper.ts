'use strict';

import { ProductRequest } from '../../dto/request/ProductRequest';
import { Products } from '../../persistence/entity/Products';

export class EateryMapper {
  static mapToEatery(rq: ProductRequest) {
    const product = new Products();
    product.nameProduct = rq.nameProduct;
    product.quantity = rq.quantity;
    product.price = rq.price;
    product.contact = rq.phone;
    return product;
  }
}
