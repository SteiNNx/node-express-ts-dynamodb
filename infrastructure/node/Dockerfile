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

# Establece las variables de entorno para la aplicación
# En este punto, los valores de ARG de la primera etapa no están disponibles, deben ser manualmente pasados como ENV
#ARG NODE_ENV
#ARG AWS_ACCESS_KEY_ID
#ARG AWS_SECRET_ACCESS_KEY
#ARG AWS_REGION
#ARG JWT_SECRET
#ARG JWT_AUDIENCE
#ARG JWT_ISSUER
#ARG PORT
#ARG API_PREFIX
#
## Convertir los ARG en ENV
#ENV NODE_ENV=${NODE_ENV}
#ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
#ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
#ENV AWS_REGION=${AWS_REGION}
#ENV JWT_SECRET=${JWT_SECRET}
#ENV JWT_AUDIENCE=${JWT_AUDIENCE}
#ENV JWT_ISSUER=${JWT_ISSUER}
#ENV PORT=${PORT}
#ENV API_PREFIX=${API_PREFIX}


# Expone el puerto en el que la aplicación escucha
#EXPOSE ${PORT}
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]
