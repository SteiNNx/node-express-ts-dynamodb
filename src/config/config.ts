import * as dotenv from 'dotenv';
dotenv.config();

// Create a configuration object to hold those environment variables.
export const config = {
    // JWT important variables
    jwt: {
        // The secret is used to sign and validate signatures.
        secret: process.env.JWT_SECRET,
        // The audience and issuer are used for validation purposes.
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER
    },
    // AWS importan variables
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        apiVersion:  process.env.AWS_API_VERSION,
        endpoint:  process.env.AWS_ENDPOINT,
    },
    // The basic API port and prefix configuration values are:
    port: process.env.PORT || 3000,
    prefix: process.env.API_PREFIX || 'api'
};

// Make our confirmation object available to the rest of our code.
export default config;
