import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ReviewEventEnum } from './enums/review-event.enum';
import { ReviewCreatedEvent } from './dto/review-created-event.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ReviewUpdatedEvent } from './dto/review-updated-event.dto';
import { ReviewDeletedEvent } from './dto/review-deleted-event.dto';

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
   * @param reviewId - The ID of the review that was created.
   * @param productId - The ID of the product that the review was created for.
   * @param rating - The rating of the review.
   */
  async sendReviewCreated(
    reviewId: string,
    productId: string,
    rating: number,
  ): Promise<void> {
    const payload = plainToClass(ReviewCreatedEvent, {
      reviewId,
      productId,
      rating,
    });

    const errors = await validate(payload);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    this.ratingClient.emit(ReviewEventEnum.Created, payload);
  }

  /**
   * Notify that a review was updated.
   * @param reviewId - The ID of the review that was updated.
   * @param productId - The ID of the product that the review was created for.
   * @param rating - The new rating of the review.
   * @param originalRating - The original rating of the review.
   */
  async sendReviewUpdated(
    reviewId: string,
    productId: string,
    rating: number,
    originalRating: number,
  ): Promise<void> {
    const payload = plainToClass(ReviewUpdatedEvent, {
      reviewId,
      productId,
      rating,
      originalRating,
    });

    const errors = await validate(payload);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    this.ratingClient.emit(ReviewEventEnum.Updated, payload);
  }

  /**
   * Notify that a review was deleted.
   * @param reviewId - The ID of the review that was deleted.
   * @param productId - The ID of the product that the review was created for.
   * @param rating - The rating of the review.
   */
  async sendReviewDeleted(
    reviewId: string,
    productId: string,
    rating: number,
  ): Promise<void> {
    const payload = plainToClass(ReviewDeletedEvent, {
      reviewId,
      productId,
      rating,
    });

    const errors = await validate(payload);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    this.ratingClient.emit(ReviewEventEnum.Deleted, payload);
  }
}
