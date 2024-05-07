import { ProductEntity } from 'apps/product-service/src/product/entities/product.entity';
import { IsNumber, Max, Min } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

/**
 * Product entity.
 */
@Entity()
export class RatingEntity {
  /**
   * The product associated with the product review.
   */
  @OneToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: ProductEntity;

  /**
   * The ID of the product associated with the product review.
   */
  @PrimaryColumn('uuid')
  productId: string;

  /**
   * The product average rating.
   * The average rating is a number between 1 and 5.
   */
  @Column({
    type: 'float',
    nullable: false,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
