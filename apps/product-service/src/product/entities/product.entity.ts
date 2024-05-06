import { IsNotEmpty, IsPositive } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReviewEntity } from '../../review/entities/review.entity';

/**
 * Product entity.
 */
@Entity()
export class ProductEntity {
  /**
   * The unique identifier.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The product name.
   */
  @Column({
    type: 'varchar',
    nullable: false,
    // TODO: Maybe we should add a unique constraint here, but it's not required by the task.
    // unique: true,
  })
  @IsNotEmpty()
  name: string;

  /**
   * The product description.
   */
  @Column({
    type: 'varchar',
    // TODO: Maybe nullable, but it's not required by the task.
    nullable: false,
  })
  @IsNotEmpty()
  description: string;

  /**
   * The amount in the wallet.
   */
  @Column({
    type: 'float',
    nullable: false,
  })
  // TODO: Hope there is no product with a negative price.
  @IsPositive()
  price: number;

  /**
   * The reviews of the product.
   * One product can have multiple reviews.
   */
  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: any[];

  // TODO: It might be a good idea to hold the creation, update and delete (soft delete) dates.
  // TODO: But it's not required by the task, so it keep it simple.
  ///**
  // * The date and time when the bank account was created.
  // */
  //@CreateDateColumn()
  //createdAt: Date;

  ///**
  // * The date and time when the bank account was last updated.
  // */
  //@UpdateDateColumn()
  //updatedAt: Date;

  ///**
  // * The date and time when the bank account was deleted.
  // */
  //@DeleteDateColumn()
  //deletedAt?: Date;
}
