# 🛒 Tienda Virtual

Proyecto técnico fullstack de prueba con funcionalidades de productos, compra simulada, historial de transacciones y despliegue en la nube.

## ---------------------Descripción

Esta aplicación simula una tienda en línea donde el usuario puede:
- Ver una lista de productos.
- Simular una compra con formulario de pago.
- Ver resultados de la transacción.
- Consultar el historial de transacciones.
- Ver totales aprobados y rechazados.

## -----------------------Tecnologías utilizadas

**Frontend:**
- React + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Modal

**Backend:**
- NestJS
- PostgreSQL
- TypeORM
- Render para despliegue
- Docker

## ---------------------Capturas de pantalla

### Página de Productos
![Productos](./screenshots/product.jpg)

---

### -------------------------Checkout / Compra
![Checkout](./screenshots/checkout.jpg)

---

### ---------------------Resultado Aprobado
![Resultado Aprobado](./screenshots/resultado-aprobado.jpg)

---

### ---------------------Historial de Transacciones
![Historial](./screenshots/historial.jpg)

---

### --------------------Vista desde un móvil
![Vista Móvil](./screenshots/vista-movil.jpg)

---
### --------------------Despliegue en Netlify
![Despliegue](./screenshots/despliegue-netlify.jpg)

---

##------------------------Pruebas realizadas

- Se probaron transacciones con datos válidos e inválidos.
- Validación de formulario.
- Persistencia de datos en el backend.
- Redirección automática tras resultado de compra.

## Cómo ejecutar localmente

### ------------------1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/PruebaTiendaVirtual.git
cd PruebaTiendaVirtual


----------------------2. Backend
bash
Copiar
Editar
cd Backend
npm install
npm run start:dev
Asegúrate de tener PostgreSQL corriendo localmente o modificar el .env.

---------------------3. Frontend
bash
Copiar
Editar
cd ../Frontend
npm install
npm run dev
Abre tu navegador en http://localhost:5173.

---------------------Despliegue

Frontend: https://tutienda.netlify.app (Netlify/Vercel)

Backend: https://backend-wompi.onrender.com (Render)

👤 Autor
Kevin Olivella