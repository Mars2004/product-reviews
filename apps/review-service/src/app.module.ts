import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RatingModule } from './rating/rating.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        RABBITMQ_URL: Joi.string().required(),
        RABBITMQ_QUEUE_NAME: Joi.string().required(),
        RABBITMQ_QUEUE_DURABLE: Joi.boolean().default(true),
        RABBITMQ_QUEUE_PERSISTENT: Joi.boolean().default(true),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class ReviewServiceModule {}
