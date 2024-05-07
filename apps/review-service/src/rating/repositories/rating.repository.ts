import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { RatingEntity } from '../entities/rating.entity';
import { ReviewEntity } from 'apps/product-service/src/review/entities/review.entity';

@Injectable()
export class RatingRepository {
  /**
   * Constructor of the ReviewRepository.
   * @param ratingRepository The TypeORM injected repository for the RatingRepository.
   * @param reviewRepository The TypeORM injected repository for the ReviewRepository.
   */
  constructor(
    /**
     * The TypeORM injected repository for the RatingRepository.
     */
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    /**
     * The TypeORM injected repository for the ReviewRepository.
     */
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  /**
   * Calculate a new rating.
   * Calculates a new rating for the given product.
   * @param productId - The ID of the product to retrieve rating.
   * @returns A promise that resolves to the created/updated RatingEntity.
   */
  async createOrUpdateRating(productId: string): Promise<RatingEntity> {
    // calculate average rating of the product
    const averageRatingResult = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .where('review.product = :productId', {
        productId,
      })
      .getRawOne();

    const averageRating = parseFloat(averageRatingResult.average);

    let rating = await this.getRatingByProductId(productId);

    if (!rating) {
      rating = new RatingEntity();
      rating.productId = productId;
    }

    this.ratingRepository.merge(rating, { rating: averageRating });

    this.validateRating(rating);

    return this.ratingRepository.save(rating);
  }

  /**
   * Get rating by product ID.
   * @param productId - The ID of the product to retrieve rating.
   * @returns A promise that resolves to the RatingEntity if found, or null if not found.
   */
  async getRatingByProductId(productId: string): Promise<RatingEntity> {
    return this.ratingRepository.findOne({
      where: {
        productId,
      },
      cache: 60 * 1000, // cache the result for 1 minute
    });
  }

  protected async validateRating(rating: RatingEntity): Promise<void> {
    const errors = await validate(rating);
    if (errors.length > 0) {
      // TODO: make it better!!!!!
      throw new Error(`Validation failed!`);
    }
  }
}
