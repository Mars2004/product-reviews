import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class RatingController {
  @EventPattern('review-created')
  async onReviewCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(`Message received (${context.getPattern()}): `, data);
    /*const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);*/
  }

  @EventPattern('review-updated')
  async onReviewUpdated(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(`Received message with pattern ${context.getPattern()}:`, data);
    /*const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //channel.ack(originalMsg);*/
  }

  @EventPattern('review-deleted')
  async onReviewDeleted(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(`Received message with pattern ${context.getPattern()}:`, data);
    /*const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //channel.ack(originalMsg);*/
  }
}
