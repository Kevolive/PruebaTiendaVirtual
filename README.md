# 🛒 Tienda Virtual - Prueba Fullstack

Este proyecto es una solución Fullstack construida con **NestJS + PostgreSQL + React**, en el contexto de una prueba técnica simulando una pasarela de pagos como Wompi.

---

##  Tecnologías usadas

- **Frontend**: React + React Router + Axios + Vite + TypeScript
- **Backend**: NestJS + TypeORM + PostgreSQL
- **Persistencia**: localStorage
- **Diseño responsive** (en progreso)
- **Simulación de pagos** con backend mock y validación simple

---

## Cómo ejecutar localmente

### Requisitos:
- Node.js ≥ 18
- PostgreSQL ≥ 13
- NPM

### Backend

```bash
cd Backend
npm install
# crea archivo .env
cp .env.example .env
# ajusta credenciales en .env
npm run start:dev

URL por defecto: http://localhost:3000

cd Frontend
cd frontend
npm install
npm run dev
Abre en navegador: http://localhost:5173

##Variales de entorno
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_clave
DB_NAME=wompi_db
WOMPI_PUBLIC_KEY=pub_stagtest_xxx
WOMPI_PRIVATE_KEY=prv_stagtest_xxx
WOMPI_URL=https://sandbox.wompi.co/v1/transactions


Funcionalidades implementadas
 Ver productos disponibles con stock

 Seleccionar producto y llenar formulario de compra

 Resumen del pedido con tarifas extra (base + envío)

 Validación de tarjeta con logo VISA/Mastercard

 Formulario en modal tipo Backdrop

 Pago simulado con respuesta mock

 Persistencia de la transacción en localStorage

 Visualización del resultado del pago (aprobado/rechazado)


Notas: Esta prueba no usa la integración real de Wompi, sino una simulación controlada a nivel de backend.

Url del deply en Vercel:https://prueba-tienda-virtual.vercel.app/


Autor
Kevin Olivella
Bello, Antioquia – Colombia
kevinolivella@gmail.com
