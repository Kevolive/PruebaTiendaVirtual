import { Body, Controller, Get, Post, Param, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    getProducts() {
        return this.productService.findAll();
    }

    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Product> {
        const product = await this.productService.findOne(Number(id));
        if (!product) {
            throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }
        return product;
    }

    @Post()
    create(@Body() dto: CreateProductDto): Promise<Product> {
        return this.productService.create(dto);
    }
}
