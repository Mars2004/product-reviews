import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from '../entities/review.entity';
import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewRepository {
  /**
   * Constructor of the ReviewRepository.
   * @param reviewRepository The TypeORM injected repository for the ReviewRepository.
   */
  constructor(
    /**
     * The TypeORM injected repository for the ReviewRepository.
     */
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  /**
   * Create a new product.
   * Creates a new product with the given data.
   * @param createProductDto - Data of the new product.
   * @returns A promise that resolves to the created ReviewEntity.
   */
  async createReview(
    createReviewDto: Partial<ReviewEntity>,
  ): Promise<ReviewEntity> {
    const review = new ReviewEntity();
    this.reviewRepository.merge(review, createReviewDto);

    this.validateReview(review);

    return this.reviewRepository.save(review);
  }

  /**
   * Update review by ID.
   * Updates an existing product review with the given data.
   * @param id - The ID of the product review to update.
   * @param updateReviewDto - The data to update the product review with.
   * @returns A promise that resolves to the updated ReviewEntity if found, or null if not found.
   */
  async updateReviewById(
    id: string,
    updateReviewDto: Partial<ReviewEntity>,
  ): Promise<ReviewEntity | null> {
    // check and remove product ID from the update data
    if (updateReviewDto.product) {
      delete updateReviewDto.product;
    }

    const review = await this.reviewRepository.findOne({
      where: {
        id,
      },
    });

    if (!review) {
      return null;
    }

    this.validateReview(review);

    this.reviewRepository.merge(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  /**
   * Delete review by ID.
   * @param id - The ID of the review to delete.
   * @returns A promise that resolves to the deleted ReviewEntity if found, or null if not found.
   */
  async deleteReviewById(id: string): Promise<ReviewEntity | null> {
    const review = await this.reviewRepository.findOne({
      where: {
        id,
      },
    });

    if (!review) {
      return null;
    }

    await this.reviewRepository.delete(id);

    return review;
  }

  /**
   * Get reviews by product ID.
   * @param productId - The ID of the product to retrieve reviews.
   * @returns A promise that resolves to the ReviewEntity if found, or null if not found.
   */
  async getReviewsByProductId(productId: string): Promise<ReviewEntity[]> {
    return this.reviewRepository.find({
      where: {
        productId,
      },
      cache: 60 * 1000, // cache the result for 1 minute
    });
  }

  protected async validateReview(review: ReviewEntity): Promise<void> {
    const errors = await validate(review);
    if (errors.length > 0) {
      // TODO: make it better!!!!!
      throw new Error(`Validation failed!`);
    }
  }
}
