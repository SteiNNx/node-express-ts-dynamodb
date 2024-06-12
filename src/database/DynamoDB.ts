import AWS from 'aws-sdk';

AWS.config.update({ region: "local" });

//environment docker container node-express:
// AWS_ACCESS_KEY_ID: 'EXAMPLE'
// AWS_SECRET_ACCESS_KEY: 'EXAMPLE'
// REGION: 'local'

export const DynamoDB = new AWS.DynamoDB({
    apiVersion: "2024-06-11",
    endpoint: 'http://dynamodb:8000',
});

export const DynamoDBDocumentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2024-06-11",
    endpoint: 'http://dynamodb:8000',
});

export default DynamoDB;