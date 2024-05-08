import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RatingModule } from './rating/rating.module';
import { LoggerModule } from 'nestjs-pino';
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
        LOG_LEVEL: Joi.string()
          .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace')
          .optional()
          .default('info'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          pinoHttp: {
            level: configService.get<string>('LOG_LEVEL'),
            transport:
              configService.get<string>('NODE_ENV') !== 'production'
                ? { target: 'pino-pretty' }
                : undefined,
            // TODO: Other options can be configured here (e.g. rotating logs, sentry integration, etc.)
          },
        };
      },
    }),
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class ReviewServiceModule {}
