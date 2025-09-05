import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product)
        private productRepository: Repository<Product>) {}

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }
async findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
}

    async create(dto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(dto)
        return this.productRepository.save(product)
    }
}
