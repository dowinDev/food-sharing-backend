import { FeedBacksRequest } from '../../dto/request/feedBacks.request';
import { FeedBacks } from '../../persistence/entity/FeedBacks';
import { PageData } from '../../config/response/page.data';
import { FeedBackResponse } from '../../dto/response/FeedBackResponse';
import { Users } from '../../persistence/entity/Users';

export class FeedBackMapper {
  static mapFeedBackToRequest(rq: FeedBacksRequest, userId: number) {
    const feedBack = new FeedBacks();

    feedBack.userId = userId;
    feedBack.eateryId = rq.eateryId;
    feedBack.message = rq.message;
    feedBack.rating = rq.rating;

    return feedBack;
  }

  static mapFeedBackToPageResponse(
    data: { content: FeedBacks[]; totalElements: number },
    page: number,
    limit: number,
  ): PageData<FeedBackResponse> {
    const arrData: FeedBackResponse[] = [];

    if (data.content.length === 0) {
      return PageData.empty<FeedBackResponse>();
    }

    data.content.forEach(function (item: {
      id: number;
      user: Users;
      message: string;
      rating: number;
    }) {
      const feedBack = new FeedBackResponse();

      feedBack.id = item.id;
      feedBack.rating = item.rating;
      feedBack.message = item.message;
      feedBack.user = item.user;

      arrData.push(feedBack);
    });

    return PageData.create(arrData, data.totalElements, page, limit);
  }

  static mapFeedBackToResponse(data: FeedBacks): FeedBackResponse {
    const response = new FeedBackResponse();

    response.id = data.id;
    response.message = data.message;
    response.rating = data.rating;
    response.user = data.user;
    response.eatery = data.eatery;

    return response;
  }
}
