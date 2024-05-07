import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
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
    ClientsModule.registerAsync([
      {
        name: 'RatingServiceClient',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('RABBITMQ_QUEUE_NAME'),
            queueOptions: {
              durable: false, //configService.get<boolean>('RABBITMQ_QUEUE_DURABLE'),
              /*persistent: configService.get<boolean>(
                'RABBITMQ_QUEUE_PERSISTENT',
              ),*/
            },
            //noAck: false,
          },
        }),
      },
    ]),
  ],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
