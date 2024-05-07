import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { validate } from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  /**
   * Constructor of the ProductRepository.
   * @param productRepository The TypeORM injected repository for the ProductRepository.
   */
  constructor(
    /**
     * The TypeORM injected repository for the ProductRepository.
     */
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  /**
   * Create a new product.
   * Creates a new product with the given data.
   * @param createProductDto - Data of the new product.
   * @returns A promise that resolves to the created ProductEntity.
   */
  async createProduct(
    createProductDto: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
    const product = new ProductEntity();
    this.productRepository.merge(product, createProductDto);

    this.validateProduct(product);

    return this.productRepository.save(product);
  }

  /**
   * Update product by ID.
   * Updates an existing product with the given data.
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data to update the product with.
   * @returns A promise that resolves to the updated ProductEntity if found, or null if not found.
   */
  async updateProductById(
    id: string,
    updateProductDto: Partial<ProductEntity>,
  ): Promise<ProductEntity | null> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      return null;
    }

    this.validateProduct(product);

    this.productRepository.merge(product, updateProductDto);
    return this.productRepository.save(product);
  }

  /**
   * Delete product by ID.
   * @param id - The ID of the product to delete.
   * @returns A promise that resolves to the deleted ProductEntity if found, or null if not found.
   */
  async deleteProductById(id: string): Promise<ProductEntity | null> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      return null;
    }

    await this.productRepository.delete(id);

    return product;
  }

  /**
   * Get product by ID.
   * @param id - The ID of the product to retrieve.
   * @returns A promise that resolves to the ProductEntity if found, or null if not found.
   */
  async getProductById(id: string): Promise<ProductEntity | null> {
    return this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['rating'],
      cache: 60 * 1000, // cache the result for 60 seconds
    });
  }

  /**
   * Get products.
   * @param limit - Optional limit to restrict the number of bank accounts returned.
   * @param offset - Optional offset to skip a number of bank accounts.
   * @returns A promise that resolves to an array of ProductEntity.
   */
  async getProducts(
    limit: number = 100,
    offset: number = 0,
  ): Promise<ProductEntity[]> {
    return this.productRepository.find({
      take: limit,
      skip: offset,
      relations: ['rating'],
      cache: 60 * 1000, // cache the result for 60 seconds
    });
  }

  protected async validateProduct(product: ProductEntity): Promise<void> {
    const errors = await validate(product);
    if (errors.length > 0) {
      // TODO: make it better!!!!!
      throw new Error(`Validation failed!`);
    }
  }
}
