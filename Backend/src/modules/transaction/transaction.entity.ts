import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @Column()
  deliveryAddress: string;

  @Column()
  status: 'PENDING' | 'APPROVED' | 'DECLINED';

  @Column('decimal')
  amount: number;

  @Column({ nullable: true })
  wompiTransactionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Product)
  product: Product;
}