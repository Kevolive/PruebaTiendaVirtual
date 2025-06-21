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

    async create(dto: CreateTransactionDto): Promise<{ transaction: Transaction; checkoutUrl: string; status: string }> {
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

        const simularStatus: 'APPROVED' | 'DECLINED'=Math.random() > 0.3 ? 'APPROVED' : 'DECLINED'

        const updateTransaction= await this.updateStatus(savedTransaction.id, simularStatus)
        return {
            transaction: updateTransaction,
            checkoutUrl,
            status: updateTransaction.status,
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

    async updateStatus(id: number, status: 'APPROVED' | 'DECLINED'): Promise<Transaction>{
        const transaction = await this.transactionRepository.findOne({
            where: { id },
            relations: ['product'],
        });

        if(!transaction) {
            throw new NotFoundException('Transacción no encontrada');
        }

        transaction.status = status;

        if (status === 'APPROVED') {
            transaction.product.stock -=1;
            await this.productRepository.save(transaction.product);
        }

        return this.transactionRepository.save(transaction)
    }

    
}
