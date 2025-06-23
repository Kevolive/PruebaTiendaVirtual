import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Product } from '../product/product.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateTransactionDto } from './transaction.dto';

describe('TransactionService', () => {
  let service: TransactionService;

  const mockTransactionRepo = {
  find: jest.fn().mockResolvedValue([]),
  create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
  save: jest.fn().mockImplementation((transaction) => Promise.resolve({ ...transaction, id: 1 })),
  findOne:jest.fn().mockResolvedValue({ id: 1, product: {id: 1, stock: 5 } })
};


  const mockProductRepo = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        WOMPI_URL: 'https://sandbox.wompi.co/v1/transactions',
        WOMPI_PUBLIC_KEY: 'test_pub_key',
        WOMPI_PRIVATE_KEY: 'test_private_key',
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockTransactionRepo,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepo,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all transactions', async () => {
    const mockTransactions = [
      { id: 1, customerName: 'Goku', amount: 1000, status: 'APPROVED' },
    ];
    mockTransactionRepo.find.mockResolvedValue(mockTransactions);

    const result = await service.findAll();
    expect(result).toEqual(mockTransactions);
    expect(mockTransactionRepo.find).toHaveBeenCalled();
  });

  it('should create a transaction and return it', async () => {
    const dto: CreateTransactionDto = {
      customerName: 'Kevin',
      productId: 1,
      cardNumber: '4111111111111111',
      expMonth: '12',
      expYear: '30',
      cvc: '123',
      deliveryAddress: 'Calle 123',
      customerEmail: '',
      amount: 0
    };

    const mockProduct = { id: 1, price: 1000, stock: 5 };
    const mockSavedTransaction = { id: 1, status: 'PENDING' };

    mockProductRepo.findOne.mockResolvedValue(mockProduct);
    mockTransactionRepo.save.mockResolvedValue(mockSavedTransaction);

    const result = await service.create(dto);
    expect(result.status).toBeDefined();
    expect(mockTransactionRepo.save).toHaveBeenCalled();
    expect(mockProductRepo.findOne).toHaveBeenCalledWith({ where: { id: dto.productId } });
  });
});
