import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { ApiTags, OmitType } from '@nestjs/swagger';

@ApiTags('Product Reviews')
export class UpdateReviewDto extends PartialType(
  OmitType(CreateReviewDto, ['productId'] as const),
) {}
