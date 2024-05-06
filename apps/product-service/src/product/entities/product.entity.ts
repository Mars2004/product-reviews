import { IsNotEmpty, IsPositive } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
