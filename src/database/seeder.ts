// src/populateData.ts
import AWS from 'aws-sdk';

// Configuración de DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'local',
  endpoint: 'http://dynamodb:8000'
});

const data = [
    { TableName: 'Books', Item: { id: '1', title: '1984', author: 'George Orwell' } },
    { TableName: 'Books', Item: { id: '2', title: 'Brave New World', author: 'Aldous Huxley' } },
    { TableName: 'Cars', Item: { id: '1', make: 'Tesla', model: 'Model S' } },
    { TableName: 'Cars', Item: { id: '2', make: 'Toyota', model: 'Corolla' } }
];

async function populate() {
    for (const item of data) {
        try {
            await dynamoDB.put(item).promise();
            console.log(`Item added to table ${item.TableName}`);
        } catch (error) {
            console.error(`Error adding item to table ${item.TableName}:`, error.message);
        }
    }
}

export default populate;
