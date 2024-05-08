import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateReviewDto } from './create-review.dto';
import { ReviewEntity } from '../entities/review.entity';

@ApiTags('Product Reviews')
export class GetReviewDto extends CreateReviewDto {
  @ApiProperty({
    title: 'Unique identifier of the product review.',
    description: 'Must be a unique UUID of the product review.',
    type: 'string',
    nullable: false,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  static fromEntity(entity: ReviewEntity): GetReviewDto {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      reviewText: entity.reviewText,
      rating: entity.rating,
      productId: entity.product?.id,
    };
  }
}
