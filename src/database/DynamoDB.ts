import AWS from 'aws-sdk';
import config from '../config/config';

AWS.config.update({ region: config.aws.region });

//environment docker container node-express:
// AWS_ACCESS_KEY_ID: 'EXAMPLE'
// AWS_SECRET_ACCESS_KEY: 'EXAMPLE'
// REGION: 'local'

export const DynamoDB = new AWS.DynamoDB({
    apiVersion: config.aws.apiVersion,
    endpoint: config.aws.endpoint,
});

export const DynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    apiVersion: config.aws.apiVersion,
    endpoint: config.aws.endpoint,
});

export default DynamoDB;