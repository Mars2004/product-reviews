import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';
import { RatingRepository } from './repositories/rating.repository';
import * as Joi from 'joi';
import { ReviewEntity } from 'apps/product-service/src/review/entities/review.entity';
import { ProductEntity } from 'apps/product-service/src/product/entities/product.entity';

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
    TypeOrmModule.forFeature([RatingEntity, ReviewEntity, ProductEntity]),
  ],
  controllers: [RatingController],
  providers: [RatingService, RatingRepository],
})
export class RatingModule {}
