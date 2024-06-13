import AWS from 'aws-sdk';
import config from '../config/config';

// Documentación Official: @link https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html

// Configurar el SDK de AWS con la región especificada
AWS.config.update({ region: config.aws.region });

// Crear una nueva instancia del servicio DynamoDB
export const DynamoDB = new AWS.DynamoDB({
    apiVersion: config.aws.apiVersion,
    endpoint: config.aws.endpoint,
});

// Crear una nueva instancia del DocumentClient de DynamoDB
export const DynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    apiVersion: config.aws.apiVersion,
    endpoint: config.aws.endpoint,
});

// Exportar la instancia de DynamoDB como exportación por defecto
export default DynamoDB;
