# Node Express TypeScript DynamoDB Docker

Este repositorio proporciona un ejemplo de cómo configurar una aplicación de Node.js con Express, TypeScript, DynamoDB y Docker.

## Requisitos Previos

Asegúrate de tener Docker instalado en tu máquina.

## Configuración

Sigue estos pasos para levantar la aplicación:

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local utilizando Git:

```bash
git clone https://github.com/SteiNNx/node-express-ts-dynamodb
```

### 2. Levantar la Aplicación con Docker

Levanta los contenedores utilizando Docker Compose:

```bash
docker-compose up -d --build
```

El parámetro -d es opcional y se usa para correr los contenedores en segundo plano. Si prefieres ver la consola de Docker, omite -d.

```bash
docker-compose up --build
```

### 3. Uso

Ir a http://localhost:3000/books
