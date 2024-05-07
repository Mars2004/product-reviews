import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { GetReviewDto } from './dto/get-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('Product Reviews')
@Controller('review')
export class ReviewController {
  /**
   * Constructor of the ReviewController.
   * @param reviewService The service that handle the business logic of the product reviews.
   */
  constructor(private readonly reviewService: ReviewService) {}

  /**
   * Create new product review.
   * Creates a new product review with the given data.
   * @returns Data of the created product review.
   */
  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Create new product review.',
    description: 'Creates a new product review with the given data.',
  })
  @ApiBody({
    type: CreateReviewDto,
    description: 'The product review data for a new product review.',
  })
  @ApiResponse({
    status: 200,
    description: 'Data of the created product review.',
    type: GetReviewDto,
  })
  @ApiResponse({ status: 400, description: 'Wrong input data.' })
  @ApiResponse({ status: 404, description: 'Product does not exist.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<GetReviewDto> {
    const review = await this.reviewService.createReview(
      CreateReviewDto.toEntity(createReviewDto),
    );

    return GetReviewDto.fromEntity(review);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update product review.',
    description: 'Updates existing product review with provided data.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product review to update.',
  })
  @ApiBody({
    type: UpdateReviewDto,
    description:
      'The product review data to update existing product review by.',
  })
  @ApiResponse({
    status: 200,
    description: 'Data of the updated product review.',
    type: GetReviewDto,
  })
  @ApiResponse({ status: 400, description: 'Wrong input data.' })
  @ApiResponse({ status: 404, description: 'Product review does not exist.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<GetReviewDto | null> {
    const updatedReview = await this.reviewService.updateReviewById(
      id,
      updateReviewDto,
    );
    if (!updatedReview) {
      throw new NotFoundException('Product review does not exist.');
    }

    return GetReviewDto.fromEntity(updatedReview);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Delete product review.',
    description: 'Deletes existing product review from database.',
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product review to update.',
  })
  @ApiResponse({
    status: 200,
    description: 'The original data of deleted product review.',
    type: GetReviewDto,
  })
  @ApiResponse({ status: 404, description: 'Product review does not exist.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async deleteReview(@Param('id') id: string): Promise<GetReviewDto | null> {
    const deletedReview = await this.reviewService.deleteReviewById(id);
    if (!deletedReview) {
      throw new NotFoundException('Product review does not exist.');
    }

    return GetReviewDto.fromEntity(deletedReview);
  }

  @Get(':productId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get product reviews.',
    description: 'Returns all reviews of the product.',
  })
  @ApiParam({
    name: 'productId',
    description: 'The ID of the product to get reviews.',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The product reviews data.',
    type: GetReviewDto,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getProductReviews(
    @Param('productId') productId: string,
  ): Promise<GetReviewDto[]> {
    const reviews = await this.reviewService.getReviewsByProductId(productId);
    return reviews.map((review) => GetReviewDto.fromEntity(review));
  }
}
