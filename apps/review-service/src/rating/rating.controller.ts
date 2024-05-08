import { ReviewCreatedEvent } from '@app/events/dto/review-created-event.dto';
import { ReviewDeletedEvent } from '@app/events/dto/review-deleted-event.dto';
import { ReviewUpdatedEvent } from '@app/events/dto/review-updated-event.dto';
import { ReviewEventEnum } from '@app/events/enums/review-event.enum';
import { validateEvent } from '@app/events/validators/event.validator';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RatingService } from './rating.service';

@Controller()
export class RatingController {
  /**
   * Logger instance of the RatingController.
   */
  private readonly logger = new Logger(RatingController.name);

  /**
   * Constructor of the RatingController.
   * @param ratingService The service that handle the business logic of the average rating.
   */
  constructor(
    private readonly ratingService: RatingService,
    //private readonly logger: Logger,
  ) {}

  @EventPattern(ReviewEventEnum.Created)
  async onReviewCreated(@Payload() data: any) {
    this.logger.log({ message: 'Received ReviewCreated event', data });

    const event = await validateEvent(ReviewCreatedEvent, data);
    await this.ratingService.onReviewCreated(event);

    this.logger.log({ message: 'ReviewCreated event processed', event });
  }

  @EventPattern(ReviewEventEnum.Updated)
  async onReviewUpdated(@Payload() data: any) {
    this.logger.log({ message: 'Received ReviewUpdated event', data });

    const event = await validateEvent(ReviewUpdatedEvent, data);
    await this.ratingService.onReviewUpdated(event);

    this.logger.log({ message: 'ReviewUpdated event processed', event });
  }

  @EventPattern(ReviewEventEnum.Deleted)
  async onReviewDeleted(@Payload() data: any) {
    this.logger.log({ message: 'Received ReviewDeleted event', data });

    const event = await validateEvent(ReviewDeletedEvent, data);
    await this.ratingService.onReviewDeleted(event);

    this.logger.log({ message: 'ReviewDeleted event processed', event });
  }
}
