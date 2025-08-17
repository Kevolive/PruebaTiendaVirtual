import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { TransactionModule } from './modules/transaction/transaction.module';



@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
      ssl: {
        rejectUnauthorized: false,
      }
    }),
    ProductModule,
    TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
