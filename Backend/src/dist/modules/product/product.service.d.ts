import { Product } from './product.entity';
import { Repository } from 'typeorm';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
}
