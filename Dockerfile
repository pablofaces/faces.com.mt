# Usa una imagen base de Node.js
FROM node:22.11.0-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY .nvmrc ./

RUN npm i

# Copiar el resto del código
COPY . . 

# Verificar que los archivos estén presentes
RUN ls -la
RUN ls -la src/
RUN cat tsconfig.json

# Construir la aplicación
RUN npm run build

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]