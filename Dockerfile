# Usa una imagen base de Node.js
FROM node:22.11.0-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copiar el resto del código
COPY . . 

# Definir la variable de entorno en el build
ARG NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
ENV NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=${NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}

# Construir la aplicación
RUN npm run build

# Etapa final para producción
FROM node:22.11.0-alpine
WORKDIR /app

# Copiar solo los archivos necesarios de la fase de construcción
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
