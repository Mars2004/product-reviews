import { IsInt, Max, Min } from 'class-validator';
import { ReviewCreatedEvent } from './review-created-event.dto';

export class ReviewUpdatedEvent extends ReviewCreatedEvent {
  @IsInt()
  @Min(0)
  @Max(5)
  originalRating: number;
}
