import { Body, Controller, Post } from '@nestjs/common';


@Controller('pagos')
export class PagosController {
@Post('checkout')
Checkout(@Body() body: {subtotal: number}) {
  const { subtotal } = body;
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const wonmpiPay = {
    valor_en_centavos: total * 100,
    moneda: 'COP',
    descripcion: 'Compra en tienda virtual',
    referencia: `TiendaVirtual-${Date.now()}`,
  };

  return wonmpiPay;
}
}
