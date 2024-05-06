import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        API_DATABASE_URL: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('API_DATABASE_URL'),
        autoLoadEntities: true,
        // TODO: Synchronize entities with the database schema.
        // TODO: Great for development, but migrations might be better for production.
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([ReviewEntity]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}