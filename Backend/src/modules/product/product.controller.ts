import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './product.dto';

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    getProducts() { 
        return this.productService.findAll();
    }

    @Post()
    create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productService.create(dto);
    }

    }

