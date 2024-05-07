import { IsInt, IsNotEmpty, IsUUID, Max, Min } from 'class-validator';

export class ReviewCreatedEvent {
  @IsUUID()
  @IsNotEmpty()
  reviewId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}
