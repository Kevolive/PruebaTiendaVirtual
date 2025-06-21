import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './transaction.dto';
import { Transaction } from './transaction.entity';
import { UpdateTransactionStatusDto } from './update-transaction-status.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(dto: CreateTransactionDto): Promise<{
        transaction: Transaction;
        checkoutUrl: string;
    }>;
    finsAll(): Promise<Transaction[]>;
    findOne(id: number): Promise<Transaction>;
    updateStatus(id: number, dto: UpdateTransactionStatusDto): Promise<Transaction>;
}
