import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
export class UpdateProductDto extends PartialType(CreateProductDto) {}
