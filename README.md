# Wompi Fullstack App

## Requisitos
- Node.js
- PostgreSQL

## Configuración

1. Clona el repo
2. Ejecuta `npm install`
3. Crea el archivo `.env` con las siguientes variables:
   - `DB_HOST=localhost`
   - `DB_PORT=5432`
   - `DB_USERNAME=postgres`
   - `DB_PASSWORD=tu_clave`
   - `DB_NAME=wompi_db`
4. Corre el proyecto con `npm run start:dev`
5. Url de productos: http://localhost:3000/products
Úsala en postman para probarla.
Endpoints disponibles
GET /products
Lista todos los productos disponibles.

POST /transactions
Crea una transacción (pedido) con estado PENDING. Retorna un enlace checkoutUrl simulado.

GET /transactions
Retorna todas las transacciones.

GET /transactions/:id
Devuelve una transacción por su ID.
6. Simulación de Wompi Checkout
Debido a que Wompi no expone su endpoint de creación de checkout en sandbox sin una cuenta empresarial, se implementó una simulación del link de pago, generando un enlace ficticio como:

https://sandbox.wompi.co/checkout/?reference=pedido-1

