import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID, Max, Min } from 'class-validator';
import { ReviewEntity } from '../entities/review.entity';
import { ProductEntity } from '../../product/entities/product.entity';

@ApiTags('Product Reviews')
export class CreateReviewDto {
  @ApiProperty({
    title: 'Reviewer first name',
    description: 'The string representing the reviewer first name.',
    type: 'string',
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    title: 'Reviewer last name',
    description: 'The string representing the reviewer last name.',
    type: 'string',
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    title: 'Product review text',
    description: 'The string representing the product review text.',
    type: 'string',
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  reviewText: string;

  @ApiProperty({
    title: 'Product review rating',
    description:
      'The number between 1 and 5 representing the product review rating.',
    type: 'number',
    nullable: false,
    required: true,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    title: 'Unique identifier of the product.',
    description: 'Must be a unique UUID of the product.',
    type: 'uuid',
    nullable: false,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  static toEntity(dto: CreateReviewDto): Partial<ReviewEntity> {
    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      reviewText: dto.reviewText,
      rating: dto.rating,
      product: { id: dto.productId } as ProductEntity,
    };
  }
}
