import { Injectable } from '@nestjs/common';
import { FeedBacksRepository } from '../persistence/repository/feedBacks.repository';
import { FeedBacksRequest } from '../dto/request/feedBacks.request';
import { FeedBackMapper } from '../utils/mapper/FeedBackMapper';
import logger from '../config/logger';
import { NotFoundException } from '../config/exception/not-found.exception';

@Injectable()
export class FeedBacksService {
  constructor(private readonly feedBacksRepository: FeedBacksRepository) {}

  async add(rq: FeedBacksRequest, userId: number) {
    try {
      const feedBack = FeedBackMapper.mapFeedBackToRequest(rq, userId);
      await this.feedBacksRepository.save(feedBack);
    } catch (error) {
      console.error('cannot add feed-back' + error);
      logger.error('cannot add feed-back' + error);
    }
  }

  async update(rq: FeedBacksRequest, userId: number, id: number) {
    try {
      const feedBack = FeedBackMapper.mapFeedBackToRequest(rq, userId);
      const checkFeedBack = await this.feedBacksRepository.findById(id);

      if (checkFeedBack == null) {
        throw new NotFoundException('not found feedBack');
      }

      await this.feedBacksRepository.update(feedBack, id);
    } catch (error) {
      console.error('cannot update feed-back' + error);
      logger.error('cannot update: ' + error);
    }
  }

  async delete(id: number) {
    const checkFeedBack = await this.feedBacksRepository.findById(id);

    if (checkFeedBack == null) {
      throw new NotFoundException('not found feedBack');
    }

    await this.feedBacksRepository.delete(id);
  }

  async viewAll(eateryId: number, page: number, limit: number) {
    try {
      const data = await this.feedBacksRepository.findByEateryId(
        eateryId,
        page,
        limit,
      );
      return FeedBackMapper.mapFeedBackToPageResponse(data, page, limit);
    } catch (error) {
      console.error('cannot view all feed-back by userId' + error);
      logger.error('cannot view all feed-back by userId ' + error);
    }
  }

  async viewDetail(id: number) {
    try {
      const data = await this.feedBacksRepository.findByUserId(id);
      return FeedBackMapper.mapFeedBackToResponse(data);
    } catch (error) {
      console.error('cannot view detail feed-back by userId' + error);
      logger.error('cannot view detail feed-back by userId ' + error);
    }
  }
}
