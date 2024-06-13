import * as dotenv from 'dotenv';
dotenv.config();

// Creamos un objeto de configuración para almacenar las variables de entorno.
export const config = {
    jwt: {
        secret: process.env.JWT_SECRET,
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: process.env.JWT_EXPIRATION,
        clockTolerance: parseInt(process.env.JWT_CLOCK_TOLERANCE || '0'),
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
        complete: process.env.JWT_COMPLETE === 'true', // TODO: Ver si es la mejor implementacion comparar (?)
        ignoreExpiration: process.env.JWT_IGNORE_EXPIRATION === 'true',
        ignoreNotBefore: process.env.JWT_IGNORE_NOT_BEFORE === 'true',
    },
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        apiVersion: process.env.AWS_API_VERSION,
        endpoint: process.env.AWS_ENDPOINT,
    },
    port: process.env.PORT,
    prefix: process.env.API_PREFIX,
};

export default config;
