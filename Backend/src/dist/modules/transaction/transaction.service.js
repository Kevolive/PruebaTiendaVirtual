"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./transaction.entity");
const product_entity_1 = require("../product/product.entity");
const config_1 = require("@nestjs/config");
let TransactionService = class TransactionService {
    transactionRepository;
    productRepository;
    configService;
    constructor(transactionRepository, productRepository, configService) {
        this.transactionRepository = transactionRepository;
        this.productRepository = productRepository;
        this.configService = configService;
    }
    async create(dto) {
        const product = await this.productRepository.findOne({
            where: { id: dto.productId },
        });
        if (!product) {
            throw new common_1.NotFoundException('Producto no encontrado');
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
        return {
            transaction: savedTransaction,
            checkoutUrl,
        };
    }
    async findAll() {
        return this.transactionRepository.find({
            relations: ['product'],
        });
    }
    async findOne(id) {
        const transaction = await this.transactionRepository.findOne({
            where: { id },
            relations: ['product'],
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transacción no encontrada');
        }
        return transaction;
    }
    async createCheckoutLink(transaction) {
        const checkoutUrl = `https://sandbox.wompi.co/checkout/?reference=pedido-${transaction.id}`;
        console.log('Link de pago:', checkoutUrl);
        return checkoutUrl;
    }
    async updateStatus(id, status) {
        const transaction = await this.transactionRepository.findOne({
            where: { id },
            relations: ['product'],
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transacción no encontrada');
        }
        transaction.status = status;
        if (status === 'APPROVED') {
            transaction.product.stock -= 1;
            await this.productRepository.save(transaction.product);
        }
        return this.transactionRepository.save(transaction);
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map