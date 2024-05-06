import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  /**
   * Constructor of the ProductService.
   * @param productRepository The repository that handle the data of the product.
   */
  constructor(private readonly productRepository: ProductRepository) {}

  /**
   * Create new product.
   * Creates a new product with the given data.
   * @param createProductDto The data of the new product.
   * @returns Data of the created product.
   */
  async createProduct(
    createProductDto: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
    return this.productRepository.createProduct(createProductDto);
  }

  /**
   * Update product by ID.
   * Updates an existing product with the given data.
   * @param id The ID of the product to update.
   * @param updateProductDto The data to update the product with.
   * @returns The updated product if found, or null if not found.
   */
  async updateProductById(
    id: string,
    updateProductDto: Partial<ProductEntity>,
  ): Promise<ProductEntity> {
    return this.productRepository.updateProductById(id, updateProductDto);
  }

  /**
   * Delete product by ID.
   * Deletes the product with the given ID.
   * @param id The ID of the product to delete.
   * @returns The deleted product if found, or null if not found.
   */
  async deleteProductById(id: string): Promise<ProductEntity> {
    return this.productRepository.deleteProductById(id);
  }

  /**
   * Get product by ID.
   * Get the product with the given ID.
   * @param id The ID of the product to get.
   * @returns The product with the given ID, or null if not found.
   */
  async getProductById(id: string): Promise<ProductEntity> {
    return this.productRepository.getProductById(id);
  }

  /**
   * Get products.
   * Get products with optional pagination.
   * @param limit The maximum number of products to return.
   * @param offset The number of products to skip.
   * @returns The products.
   */
  async getProducts(limit?: number, offset?: number): Promise<ProductEntity[]> {
    return this.productRepository.getProducts(limit, offset);
  }
}
