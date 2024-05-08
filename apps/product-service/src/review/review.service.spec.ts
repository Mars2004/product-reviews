import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { EventsService } from '@app/events';
import { ReviewRepository } from './repositories/review.repository';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: ReviewRepository,
          useValue: {
            createReview: jest.fn(),
            updateReviewById: jest.fn(),
            deleteReviewById: jest.fn(),
            getReviewsByProductId: jest.fn(),
          },
        },
        {
          provide: EventsService,
          useValue: {
            sendReviewCreated: jest.fn(),
            sendReviewUpdated: jest.fn(),
            sendReviewDeleted: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
