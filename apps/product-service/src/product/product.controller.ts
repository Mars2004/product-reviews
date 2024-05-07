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
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  /**
   * Constructor of the ProductController.
   * @param productService The service that handle the business logic of the product.
   */
  constructor(private readonly productService: ProductService) {}

  /**
   * Create new product.
   * Creates a new product with the given data.
   * @returns Data of the created product.
   */
  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Create new product.',
    description: 'Creates a new product with the given data.',
  })
  @ApiBody({
    type: CreateProductDto,
    description: 'The product data for a new product.',
  })
  @ApiResponse({
    status: 200,
    description: 'Data of the created product.',
    type: GetProductDto,
  })
  @ApiResponse({ status: 400, description: 'Wrong input data.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<GetProductDto> {
    const product = await this.productService.createProduct(createProductDto);
    return GetProductDto.fromEntity(product);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update product.',
    description: 'Updates existing product with provided data.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the product to update.' })
  @ApiBody({
    type: UpdateProductDto,
    description: 'The product data to update existing product by.',
  })
  @ApiResponse({
    status: 200,
    description: 'Data of the updated product.',
    type: GetProductDto,
  })
  @ApiResponse({ status: 400, description: 'Wrong input data.' })
  @ApiResponse({ status: 404, description: 'Product does not exist.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<GetProductDto | null> {
    const updatedProduct = await this.productService.updateProductById(
      id,
      updateProductDto,
    );
    if (!updatedProduct) {
      throw new NotFoundException('Product does not exist.');
    }

    return GetProductDto.fromEntity(updatedProduct);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Delete product.',
    description: 'Deletes existing product from database.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the product to update.' })
  @ApiResponse({
    status: 200,
    description: 'The original data of deleted product.',
    type: GetProductDto,
  })
  @ApiResponse({ status: 404, description: 'Product does not exist.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async deleteProduct(@Param('id') id: string): Promise<GetProductDto | null> {
    const deletedProduct = await this.productService.deleteProductById(id);
    if (!deletedProduct) {
      throw new NotFoundException('Product does not exist.');
    }

    return GetProductDto.fromEntity(deletedProduct);
  }

  @Get('list')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get products.',
    description: 'Returns products with pagination.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of results.',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Number of results to skip for pagination.',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of products.',
    type: [GetProductDto],
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getProducts(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<GetProductDto[]> {
    const products = await this.productService.getProducts(
      isNaN(limit) ? 100 : limit,
      isNaN(offset) ? 0 : offset,
    );

    return products.map((product) => GetProductDto.fromEntity(product));
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get product.',
    description: 'Returns existing product data.',
  })
  @ApiParam({ name: 'id', description: 'The ID of the product to read.' })
  @ApiResponse({
    status: 200,
    description: 'The product data.',
    type: GetProductDto,
  })
  @ApiResponse({ status: 404, description: 'Product does not exist.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getProduct(@Param('id') id: string): Promise<GetProductDto | null> {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException('Product does not exist.');
    }

    return GetProductDto.fromEntity(product);
  }
}
