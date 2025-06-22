# 🛒 Tienda Virtual - Prueba Fullstack

Este proyecto es una solución Fullstack construida con **NestJS + PostgreSQL + React**, en el contexto de una prueba técnica simulando una pasarela de pagos con Wompi.

---

## 🚀 Tecnologías usadas

- **Frontend**: React + React Router + Axios + Vite + TypeScript
- **Backend**: NestJS + TypeORM + PostgreSQL
- **Base de datos**: PostgreSQL en Render
- **Diseño responsive** (en progreso)
- **Integración real con Wompi (Sandbox)**

---

## 🔧 Cómo ejecutar localmente

### Requisitos:
- Node.js ≥ 18
- PostgreSQL ≥ 13
- NPM

---

Backend

```bash
cd Backend
npm install
cp .env.example .env # crea archivo de variables
# edita tus credenciales de conexión a PostgreSQL
npm run start:dev
Por defecto se ejecuta en: http://localhost:3000

Frontend
bash
Copiar
Editar
cd Frontend
npm install
npm run dev
Abre en navegador: http://localhost:5173

------Variables de entorno necesarias----
env
Copiar
Editar
DB_HOST=tu_host_render.com
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=****
DB_NAME=wompi_db

WOMPI_PUBLIC_KEY=pub_stagtest_xxx
WOMPI_PRIVATE_KEY=prv_stagtest_xxx
WOMPI_URL=https://sandbox.wompi.co/v1/transactions

                                    ----- Funcionalidades implementadas -----
Ver productos disponibles con stock

Crear productos desde backend

Seleccionar producto y llenar formulario de compra

Validación básica de tarjeta (Visa/Mastercard) con íconos

Modal tipo backdrop para compra

Simulación de pago con Wompi en entorno sandbox

Registro de transacciones en PostgreSQL

Visualización de historial de transacciones

Backend y base de datos desplegados en Render

Frontend desplegado en Vercel

---- URLs de despliegue ----
Frontend (Vercel): https://prueba-tienda-virtual.vercel.app/

Backend (Render): https://backend-wompi.onrender.com/


###  Documentación de la API (Postman)

📬 Documentación de la API (Postman)
Puedes revisar, probar y explorar todos los endpoints del backend desde esta colección de Postman, incluyendo ejemplos de peticiones GET, POST y detalles sobre las rutas disponibles:

🔗 Documentación Postman
(https://web.postman.co/workspace/My-Workspace~cd984496-425e-4e1c-800d-35eb2278b02b/collection/39635729-d1a11389-42fc-47f8-98d5-5dc93efda327?action=share&creator=39635729&action_performed=google_login)

🧪 Endpoints disponibles en la colección:
Método	Ruta	Descripción
GET	/products	Obtener todos los productos disponibles.
POST	/products	Crear un nuevo producto.
GET	/transactions	Obtener el historial de transacciones.
POST	/transactions	Crear una transacción simulada con Wompi.

Todos los endpoints están conectados al backend desplegado en:
https://backend-wompi.onrender.com

👨‍💻 Autor
Kevin Olivella
📍 Bello, Antioquia – Colombia
📧 kevinolivella@gmail.com