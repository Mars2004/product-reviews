import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
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
    ProductModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
