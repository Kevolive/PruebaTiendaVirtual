import { Product } from "../product/product.entity";
export declare class Transaction {
    id: number;
    customerName: string;
    customerEmail: string;
    deliveryAddress: string;
    status: 'PENDING' | 'APPROVED' | 'DECLINED';
    amount: number;
    wompiTransactionId: string;
    createdAt: Date;
    product: Product;
}
