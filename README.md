# ------------------------------------------------------Tienda Virtual - Prueba Técnica Fullstack con Wompi -------------------------------------------------

Este proyecto es una solución Fullstack construida con **NestJS + PostgreSQL + React**, que simula una tienda en línea con integración real a la pasarela de pagos **Wompi (modo Sandbox)**.

Incluye backend funcional, pruebas unitarias, frontend con diseño responsive, documentación en Postman y despliegue en producción.

---

## ------------Tecnologías usadas

- **Frontend**: React + Vite + TypeScript + React Router + Axios
- **Backend**: NestJS + TypeORM + PostgreSQL
- **Base de datos**: PostgreSQL (Render)
- **Testing**:
  - Backend: Jest + Supertest
  - Frontend: Vitest + Testing Library
- **Pasarela de pagos**: Wompi (modo sandbox)
- **Deployment**:
  - Backend: Render
  - Frontend: Vercel
- **Documentación**: Postman

---

## ---------------Funcionalidades implementadas

- Ver productos disponibles con stock  
- Crear productos desde backend  
- Seleccionar producto y llenar formulario de compra  
- Validación básica de tarjeta (Visa/Mastercard) con íconos  
- Simulación de pago real con Wompi Sandbox  
- Registro de transacciones en PostgreSQL  
- Visualización de historial de transacciones  
- Diseño responsive (mobile y desktop)  
- Feedback visual en cada paso del flujo de compra  
- Modal de confirmación con íconos de estado  
- Backend y base de datos desplegados en Render  
- Frontend desplegado en Vercel  

---

##  Estructura del proyecto

/Backend
│ /src
│ /product
│ /transaction
│ .env.example
│ main.ts
│ app.module.ts
│ ...
/Frontend
│ /src
│ /components
│ /pages
│ App.tsx
│ main.tsx
│ ...
README.md

yaml
Copiar
Editar

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
cp .env.example .env
# Edita tus credenciales de conexión a PostgreSQL y claves Wompi
npm run start:dev
Backend por defecto en: http://localhost:3000

 Frontend
bash
Copiar
Editar
cd Frontend
npm install
npm run dev
Frontend por defecto en: http://localhost:5173

Ejecutar pruebas:

Backend
bash
Copiar
Editar
npm run test        # Ejecuta pruebas unitarias
npm run test:cov    # Genera cobertura

Frontend
bash
Copiar
Editar
npm run test
Cobertura actual (Backend):
sql
Copiar
Editar
File         | % Stmts | % Branch | % Funcs | % Lines
-------------|---------|----------|---------|---------
All files    |  21.39  |   0.57   |  17.64  |  22.9
 

                                                    ------Documentación de la API (Postman)---------

(https://web.postman.co/workspace/My-Workspace~cd984496-425e-4e1c-800d-35eb2278b02b/collection/39635729-d1a11389-42fc-47f8-98d5-5dc93efda327?action=share&creator=39635729&action_performed=google_login)

Endpoints disponibles
Método	Ruta	Descripción
GET	/products	Obtener todos los productos disponibles
POST	/products	Crear un nuevo producto
GET	/transactions	Obtener historial de transacciones
POST	/transactions	Crear una transacción simulada

URLs de despliegue
🔗Frontend (Vercel): https://prueba-tienda-virtual.vercel.app/
    Frontend (Netlify): https://tiendavirtualprueba.netlify.app/

Backend (Render): https://backend-wompi.onrender.com

                                            ---------Arquitectura del Backend----------

El backend sigue una estructura modular inspirada en la Arquitectura Hexagonal (Ports and Adapters):

Módulos por dominio: product, transaction

Controladores como puertos primarios

Servicios que encapsulan lógica de negocio

DTOs y entidades como adaptadores

Tests unitarios con Jest (*.spec.ts)

Esta organización permite:

Separación clara de responsabilidades

Mayor mantenibilidad

Escalabilidad y facilidad para testing

                                            -----Mejoras UI/UX implementadas-----

Cards con sombra y diseño limpio para productos

Inputs con íconos y formularios estilizados

Feedback visual con íconos ✅ / ❌ en resultados de pago

Skeleton loaders y mensajes amigables

Diseño responsivo para dispositivos móviles

Capturas de pantalla


 Página de Productos
### Página de Productos
![Productos](./screenshots/product.jpg)

---

 Checkout / Compra
![Checkout](./screenshots/checkout.jpg)

---

 Resultado Aprobado
![Resultado Aprobado](./screenshots/resultado-aprobado.jpg)

---

Historial de Transacciones
![Historial](./screenshots/historial.jpg)

---

Vista desde un móvil
![Vista Móvil](./screenshots/vista-movil.jpg)

---
Despliegue en Netlify
![Despliegue](./screenshots/despliegue-netlify.jpg)



👨‍💻 Autor
Kevin Olivella
