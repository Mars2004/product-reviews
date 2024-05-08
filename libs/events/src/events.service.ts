import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ReviewEventEnum } from './enums/review-event.enum';
import { ReviewCreatedEvent } from './dto/review-created-event.dto';
import { ReviewUpdatedEvent } from './dto/review-updated-event.dto';
import { ReviewDeletedEvent } from './dto/review-deleted-event.dto';
import { validateEvent } from './validators/event.validator';

@Injectable()
export class EventsService {
  /**
   * Constructor of the EventsService.
   * @param reviewRepository The repository that handle the data of product reviews.
   */
  constructor(
    @Inject('RatingServiceClient') private readonly ratingClient: ClientProxy,
  ) {}

  /**
   * Notify that a review was created.
   * @param productId - The ID of the product that the review was created for.
   */
  async sendReviewCreated(productId: string): Promise<void> {
    const payload = await validateEvent(ReviewCreatedEvent, {
      productId,
    });

    this.ratingClient.emit(ReviewEventEnum.Created, payload);
  }

  /**
   * Notify that a review was updated.
   * @param productId - The ID of the product that the review was created for.
   */
  async sendReviewUpdated(productId: string): Promise<void> {
    const payload = await validateEvent(ReviewUpdatedEvent, {
      productId,
    });

    this.ratingClient.emit(ReviewEventEnum.Updated, payload);
  }

  /**
   * Notify that a review was deleted.
   * @param productId - The ID of the product that the review was created for.
   */
  async sendReviewDeleted(productId: string): Promise<void> {
    const payload = await validateEvent(ReviewDeletedEvent, {
      productId,
    });

    this.ratingClient.emit(ReviewEventEnum.Deleted, payload);
  }
}
