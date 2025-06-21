import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Product } from '../product/product.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Product])],
  providers: [TransactionService],
  controllers: [TransactionController]
})
export class TransactionModule {}
