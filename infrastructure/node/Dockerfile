# Primera etapa: Construcción
FROM node:22-alpine AS builder

# Establece el directorio de trabajo dentro de la imagen
WORKDIR /usr/src/app

# Copia solo los archivos de dependencias para instalar
COPY package.json package-lock.json ./

# Instala las dependencias (devDependencies incluidas para la etapa de construcción)
RUN npm install

# Copia el archivo de configuración TypeScript y el código fuente
COPY tsconfig.json ./
COPY src ./src

# Compila el código TypeScript en la carpeta dist
RUN npm run build

# Segunda etapa: Utiliza una imagen más ligera solo con lo necesario para correr la app
FROM node:22-alpine

# Establece el directorio de trabajo dentro de la imagen
WORKDIR /usr/src/app

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE ${PORT}

# Comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]
