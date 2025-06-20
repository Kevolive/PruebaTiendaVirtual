import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './transaction.dto';
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionController {

    constructor(private readonly transactionService:TransactionService) {}

    @Post()
    create(
        @Body() dto: CreateTransactionDto,
    ): Promise<{ transaction:Transaction; checkoutUrl: string}> {
        return this.transactionService.create(dto);
    }

    @Get()
    finsAll(): Promise<Transaction[]> {
        return this.transactionService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Transaction> {
        return this.transactionService.findOne(id);
    }
}
