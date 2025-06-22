# Etapa de construcción
FROM node:18-alpine as build

WORKDIR /app

# Copiar solo los archivos necesarios desde el host al contenedor
COPY Backend/package*.json ./
RUN npm install

COPY Backend ./

RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY Backend/package*.json ./

CMD ["node", "dist/main"]
