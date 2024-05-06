import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './repositories/review.repository';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewService {
  /**
   * Constructor of the ReviewService.
   * @param reviewRepository The repository that handle the data of product reviews.
   */
  constructor(private readonly reviewRepository: ReviewRepository) {}

  /**
   * Create a new review.
   * Creates a new review with the given data.
   * @param createReviewDto - Data of the new review.
   * @returns A promise that resolves to the created ReviewEntity.
   */
  async createReview(
    createReviewDto: Partial<ReviewEntity>,
  ): Promise<ReviewEntity> {
    // TODO: check that the product exists
    return this.reviewRepository.createReview(createReviewDto);
  }

  /**
   * Update review by ID.
   * Updates an existing review with the given data.
   * @param id - The ID of the review to update.
   * @param updateReviewDto - The data to update the review with.
   * @returns A promise that resolves to the updated ReviewEntity if found, or null if not found.
   */
  async updateReviewById(
    id: string,
    updateReviewDto: Partial<ReviewEntity>,
  ): Promise<ReviewEntity | null> {
    // TODO: do not allow updating the product ID
    return this.reviewRepository.updateReviewById(id, updateReviewDto);
  }

  /**
   * Delete review by ID.
   * @param id - The ID of the review to delete.
   * @returns A promise that resolves to the deleted ReviewEntity if found, or null if not found.
   */
  async deleteReviewById(id: string): Promise<ReviewEntity | null> {
    return this.reviewRepository.deleteReviewById(id);
  }

  /**
   * Get reviews by product ID.
   * @param productId - The ID of the product to retrieve reviews.
   * @returns A promise that resolves to the ReviewEntity if found, or null if not found.
   */
  async getReviewsByProductId(productId: string): Promise<ReviewEntity[]> {
    return this.reviewRepository.getReviewsByProductId(productId);
  }
}
