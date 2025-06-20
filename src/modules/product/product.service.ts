import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    findAll() {
        return [
            { id: 1, name: 'Camiseta de algodón', price: 10000, stock:10 },
            { id: 2, name: 'Suéter tipo polo', price: 20000, stock:11 },
            { id: 3, name: 'Camisa elegantek', price: 15000, stock:16 },
          
        ];
    }
}
