import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../config/security/jwt.AuthGuard';
import { GetUserId, Roles } from '../config/security/roles.decorator';
import { rolesEnum } from '../utils/Constants';
import { ResponseWrapper } from '../config/response/response-wrapper';
import { FeedBacksService } from '../service/feedBacks.service';
import { FeedBacksRequest } from '../dto/request/feedBacks.request';
import logger from '../config/logger';

@Controller('api/feed-back')
@ApiTags('feedBacks')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class FeedBackController {
  constructor(private readonly feedBacksService: FeedBacksService) {}

  @Post()
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @ApiOperation({ tags: ['feedBacks'], summary: 'add feed-back' })
  async addFeedBack(@Body() rq: FeedBacksRequest, @GetUserId() userId: number) {
    try {
      await this.feedBacksService.add(rq, userId);
      return ResponseWrapper.success();
    } catch (error) {
      console.error('error feed-back: ' + error);
      logger.error('error feed-back: ' + error);
    }
  }

  @Put('/:id')
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @ApiOperation({ tags: ['feedBacks'], summary: 'update feed-back' })
  async updateFeedBack(
    @Body() rq: FeedBacksRequest,
    @GetUserId() userId: number,
    @Param('id') id: number,
  ) {
    try {
      await this.feedBacksService.update(rq, userId, id);
      return ResponseWrapper.success();
    } catch (error) {
      console.error('error update feedBack: ' + error);
      logger.error('error update feedBack: ' + error);
    }
  }

  @Delete('/:id')
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @ApiOperation({ tags: ['feedBacks'], summary: 'delete feed-back' })
  async deleteFeedBack(@Param('id') id: number) {
    try {
      await this.feedBacksService.delete(id);
      return ResponseWrapper.success();
    } catch (error) {
      console.error('error delete feedBack: ' + error);
      logger.error('error delete feedBack: ' + error);
    }
  }

  @Get()
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @ApiOperation({ tags: ['feedBacks'], summary: 'view feed-back by eatery-id' })
  async getAllFeedBack(
    @Query('productId') eateryId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      const message = await this.feedBacksService.viewAll(
        eateryId,
        page,
        limit,
      );
      return ResponseWrapper.success(message);
    } catch (error) {
      console.error('error view feedBack: ' + error);
      logger.error('error view feedBack: ' + error);
    }
  }

  @Get('/:id')
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @ApiOperation({ tags: ['feedBacks'], summary: 'view detail feed-back' })
  async getDetail(@Param('id') id: number) {
    try {
      const message = await this.feedBacksService.viewDetail(id);
      return ResponseWrapper.success(message);
    } catch (error) {
      console.error('error view detail feedBack: ' + error);
      logger.error('error view detail feedBack: ' + error);
    }
  }
}
