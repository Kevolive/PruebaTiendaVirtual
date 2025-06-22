import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product)
        private productRepository: Repository<Product>) {}

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async create(product: Product): Promise<Product> {
        return this.productRepository.save(product)
    }
}
