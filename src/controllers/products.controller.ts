'use strict';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../config/security/jwt.AuthGuard';
import { ProductsService } from '../service/products.service';
import { ProductRequest } from '../dto/request/ProductRequest';
import { ResponseWrapper } from '../config/response/response-wrapper';
import { GetUserId, Roles } from '../config/security/roles.decorator';
import { rolesEnum } from '../utils/Constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/upload.config';
import logger from '../config/logger';

@ApiTags('Products')
@Controller('api/products')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ tags: ['Products'], summary: 'add new product' })
  async addProduct(
    @Body() rq: ProductRequest,
    @UploadedFile() image: Express.Multer.File,
    @GetUserId() userId: number,
  ) {
    try {
      let imageUrl = '';
      if (image) {
        // Xử lý lưu file và trả về URL hoặc tên file của ảnh
        imageUrl = image.filename; // Giả sử đây là tên file được lưu
      }

      await this.productService.addProduct(rq, userId, imageUrl);
      return ResponseWrapper.success();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ tags: ['Products'], summary: 'get all product' })
  async getAllProduct(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      const maxLimit = 50;
      const sanitizedLimit = limit > maxLimit ? maxLimit : limit;
      return ResponseWrapper.success(
        await this.productService.getAllProducts(page, sanitizedLimit),
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Put('/:id')
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @ApiOperation({ tags: ['Products'], summary: 'update product' })
  async updateProduct(
    @Body() rq: ProductRequest,
    @GetUserId() userId: number,
    @Param('id') id: number,
  ) {
    try {
      await this.productService.update(rq, userId, id);
      return ResponseWrapper.success();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Delete('/:id')
  @Roles(rolesEnum.ADMIN, rolesEnum.USER)
  @ApiOperation({ tags: ['Products'], summary: 'delete product' })
  async deleteProduct(@GetUserId() userId: number, @Param('id') id: number) {
    try {
      await this.productService.delete(id, userId);
      return ResponseWrapper.success();
    } catch (error) {
      console.error(error);
      logger.error(error);
      throw error;
    }
  }

  @Get('/:id')
  @ApiOperation({ tags: ['Products'], summary: 'get product by id' })
  async getProductById(@Param('id') id: number) {
    try {
      return ResponseWrapper.success(
        await this.productService.getProductsById(id),
      );
    } catch (error) {
      console.error(error);
      logger.error(error);
      throw error;
    }
  }
}
