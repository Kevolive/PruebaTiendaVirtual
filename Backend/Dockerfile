# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Compila el proyecto Nest
RUN npm run build

# Expone el puerto (debe coincidir con el que usa tu app)
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "start"]
