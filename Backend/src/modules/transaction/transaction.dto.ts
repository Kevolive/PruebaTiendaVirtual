import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsNotEmpty()
  @IsString()
  expMonth: string;

  @IsNotEmpty()
  @IsString()
  expYear: string;

  @IsNotEmpty()
  @IsString()
  cvc: string;
}
