import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReviewCreatedEvent {
  @IsUUID()
  @IsNotEmpty()
  productId: string;
}
