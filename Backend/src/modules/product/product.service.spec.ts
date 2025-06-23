import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

const mockProduct = {
    id: 1,
    name: 'Camisa Goku',
    description: 'Camisa edición especial Goku SSJ',
    price: 45000,
    stock: 10,
};

describe('ProductService', () => {
    let service: ProductService;
    let repo: Repository<Product>;

    const mockRepo = {
        find: jest.fn().mockResolvedValue([mockProduct]),
        save: jest.fn().mockResolvedValue(mockProduct),
        create: jest.fn().mockImplementation((dto) => dto),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockRepo,
                },
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
        repo = module.get<Repository<Product>>(getRepositoryToken(Product));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array of products', async () => {
            const result = await service.findAll();
            expect(result).toEqual([mockProduct]);
            expect(repo.find).toHaveBeenCalled();
        });
    });

    describe('create', () => {
        it('should save a product', async () => {
            const { id, ...newProduct } = mockProduct;
            const result = await service.create(newProduct as Product);
            expect(result).toEqual(mockProduct);
            expect(repo.save).toHaveBeenCalledWith(newProduct);
        });
    });
});
