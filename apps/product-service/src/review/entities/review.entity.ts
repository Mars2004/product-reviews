import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

/**
 * Review entity.
 */
@Entity()
export class ReviewEntity {
  /**
   * The unique identifier.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The reviewer first name.
   */
  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsNotEmpty()
  firstName: string;

  /**
   * The reviewer last name.
   */
  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsNotEmpty()
  lastName: string;

  /**
   * The product review text.
   */
  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsNotEmpty()
  reviewText: string;

  /**
   * The product review rating.
   * The rating is a number between 0 and 5.
   */
  @Column({
    type: 'int',
    nullable: false,
  })
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;

  /**
   * The product associated with the product review.
   */
  @Index()
  @ManyToOne(() => ProductEntity, (product) => product.id, {
    nullable: false,
    // TODO: Maybe "SET NULL" is a better option here, but it's not required by the task.
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}
