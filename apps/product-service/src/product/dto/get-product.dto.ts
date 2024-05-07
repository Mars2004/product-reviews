import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { ProductEntity } from '../entities/product.entity';

@ApiTags('Product')
export class GetProductDto extends CreateProductDto {
  @ApiProperty({
    title: 'Unique identifier of the product.',
    description: 'Must be a unique UUID of the product.',
    type: 'string',
    nullable: false,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    title: 'Product rating',
    description:
      'Positive number representing the average rating. Null when product has no reviews.',
    type: 'float',
    nullable: true,
    required: false,
    default: null,
  })
  averageRating?: number;

  static fromEntity(entity: ProductEntity): GetProductDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      averageRating: entity.rating.rating,
    };
  }
}
