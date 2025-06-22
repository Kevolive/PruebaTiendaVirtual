import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    getProducts() { 
        return this.productService.findAll();
    }

    @Post()
    create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product)
    }

    }

