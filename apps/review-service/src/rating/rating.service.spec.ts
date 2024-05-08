import { Test, TestingModule } from '@nestjs/testing';
import { RatingService } from './rating.service';
import { RatingRepository } from './repositories/rating.repository';

describe('RatingService', () => {
  let service: RatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingService,
        {
          provide: RatingRepository,
          useValue: {
            createRating: jest.fn(),
            updateRatingById: jest.fn(),
            deleteRatingById: jest.fn(),
            getRatingsByProductId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RatingService>(RatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
