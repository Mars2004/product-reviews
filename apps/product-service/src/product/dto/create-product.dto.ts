import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

@ApiTags('Product')
export class CreateProductDto {
  @ApiProperty({
    title: 'Product name',
    description: 'The string representing the product name',
    type: 'string',
    nullable: false,
    required: true,
  })
  name: string;

  @ApiProperty({
    title: 'Product description',
    description: 'The string representing the product description',
    type: 'string',
    nullable: false,
    required: true,
  })
  description: string;

  @ApiProperty({
    title: 'Product price',
    description: 'Positive number representing the product price.',
    type: 'number',
    nullable: false,
    required: true,
  })
  // TODO: Hope there is no product with a negative price.
  @IsPositive()
  price: number;
}
