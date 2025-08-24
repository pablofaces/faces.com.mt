# Usa una imagen base de Node.js
FROM node:22.11.0-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del código
COPY . . 

# Construir la aplicación
ENV NODE_ENV=production
RUN npm run build

# Etapa final para producción
FROM node:22.11.0-alpine AS runner
WORKDIR /app

# Copiar solo los archivos necesarios de la fase de construcción
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--max-old-space-size=512

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public public

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
