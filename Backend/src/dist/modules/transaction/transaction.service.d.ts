import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Product } from '../product/product.entity';
import { CreateTransactionDto } from './transaction.dto';
import { ConfigService } from '@nestjs/config';
export declare class TransactionService {
    private transactionRepository;
    private productRepository;
    private configService;
    constructor(transactionRepository: Repository<Transaction>, productRepository: Repository<Product>, configService: ConfigService);
    create(dto: CreateTransactionDto): Promise<{
        transaction: Transaction;
        checkoutUrl: string;
    }>;
    findAll(): Promise<Transaction[]>;
    findOne(id: number): Promise<Transaction>;
    createCheckoutLink(transaction: Transaction): Promise<string>;
    updateStatus(id: number, status: 'APPROVED' | 'DECLINED'): Promise<Transaction>;
}
