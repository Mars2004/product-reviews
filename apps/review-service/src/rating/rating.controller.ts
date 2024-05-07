import { ReviewCreatedEvent } from '@app/events/dto/review-created-event.dto';
import { ReviewDeletedEvent } from '@app/events/dto/review-deleted-event.dto';
import { ReviewUpdatedEvent } from '@app/events/dto/review-updated-event.dto';
import { ReviewEventEnum } from '@app/events/enums/review-event.enum';
import { validateEvent } from '@app/events/validators/event.validator';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class RatingController {
  @EventPattern(ReviewEventEnum.Created)
  async onReviewCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    const event = await validateEvent(ReviewCreatedEvent, data);
    console.log(`Message received (${context.getPattern()}): `, event);
    /*const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);*/
  }

  @EventPattern(ReviewEventEnum.Updated)
  async onReviewUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
    const event = await validateEvent(ReviewUpdatedEvent, data);
    console.log(
      `Received message with pattern ${context.getPattern()}:`,
      event,
    );
    /*const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //channel.ack(originalMsg);*/
  }

  @EventPattern(ReviewEventEnum.Deleted)
  async onReviewDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    const event = await validateEvent(ReviewDeletedEvent, data);
    console.log(
      `Received message with pattern ${context.getPattern()}:`,
      event,
    );
    /*const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //channel.ack(originalMsg);*/
  }
}
