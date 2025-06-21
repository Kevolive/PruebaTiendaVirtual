import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './transaction.dto';
import { Transaction } from './transaction.entity';
import { UpdateTransactionStatusDto } from './update-transaction-status.dto';

@Controller('transactions')
export class TransactionController {

    constructor(private readonly transactionService:TransactionService) {}

    @Post()
    create(
        @Body() dto: CreateTransactionDto,
    ): Promise<{ transaction:Transaction; checkoutUrl: string, status: string}> {
        return this.transactionService.create(dto);
    }

    @Get()
    findAll(): Promise<Transaction[]> {
        return this.transactionService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Transaction> {
        return this.transactionService.findOne(id);
    }
    @Patch(':id/status')
        updateStatus(
            @Param('id') id: number,
            @Body()dto: UpdateTransactionStatusDto,
        ): Promise<Transaction> {
            return this.transactionService.updateStatus(id, dto.status)
        }
    
}
