import { ReviewCreatedEvent } from '@app/events/dto/review-created-event.dto';
import { ReviewDeletedEvent } from '@app/events/dto/review-deleted-event.dto';
import { ReviewUpdatedEvent } from '@app/events/dto/review-updated-event.dto';
import { Injectable } from '@nestjs/common';
import { RatingRepository } from './repositories/rating.repository';

@Injectable()
export class RatingService {
  /**
   * Constructor of the RatingRepository.
   * @param reviewRepository The repository that handle the data of average rating.
   */
  constructor(private readonly ratingRepository: RatingRepository) {}

  /**
   * Handle the event when a review is created.
   * @param event The event data of the review created.
   */
  async onReviewCreated(event: ReviewCreatedEvent): Promise<void> {
    return this.updateAverageRating(event.productId);
  }

  /**
   * Handle the event when a review is updated.
   * @param event The event data of the review updated.
   */
  async onReviewUpdated(event: ReviewUpdatedEvent): Promise<void> {
    return this.updateAverageRating(event.productId);
  }

  /**
   * Handle the event when a review is deleted.
   * @param event The event data of the review deleted.
   */
  async onReviewDeleted(event: ReviewDeletedEvent): Promise<void> {
    return this.updateAverageRating(event.productId);
  }

  /**
   * Update the average rating of the product.
   * @param productId The ID of the product to update the average rating.
   */
  protected async updateAverageRating(productId: string): Promise<void> {
    this.ratingRepository.createOrUpdateRating(productId);
  }
}
