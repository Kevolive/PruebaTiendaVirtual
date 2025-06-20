import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Product } from '../product/product.entity';
import { CreateTransactionDto } from './transaction.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        private configService: ConfigService,
    ) { }

    async create(dto: CreateTransactionDto): Promise<{ transaction: Transaction; checkoutUrl: string }> {
        const product = await this.productRepository.findOne({
            where: { id: dto.productId },
        });

        if (!product) {
            throw new NotFoundException('Producto no encontrado');
        }

        const transaction = this.transactionRepository.create({
            customerName: dto.customerName,
            customerEmail: dto.customerEmail,
            deliveryAddress: dto.deliveryAddress,
            amount: dto.amount,
            status: 'PENDING',
            product,
        });

        const savedTransaction = await this.transactionRepository.save(transaction);

        const checkoutUrl = await this.createCheckoutLink(savedTransaction);

        return {
            transaction: savedTransaction,
            checkoutUrl,
        };
    }

    async findAll(): Promise<Transaction[]> {
        return this.transactionRepository.find({
            relations: ['product'],
        });
    }

    async findOne(id: number): Promise<Transaction> {
        const transaction = await this.transactionRepository.findOne({
            where: { id },
            relations: ['product'],
        });

        if (!transaction) {
            throw new NotFoundException('Transacción no encontrada');
        }

        return transaction;
    }

    /**
     * Método simulado que genera un enlace ficticio de pago con Wompi.
     */
    async createCheckoutLink(transaction: Transaction): Promise<string> {
        const checkoutUrl = `https://sandbox.wompi.co/checkout/?reference=pedido-${transaction.id}`;
        console.log('Link de pago:', checkoutUrl);
        return checkoutUrl;
    }

    
}
