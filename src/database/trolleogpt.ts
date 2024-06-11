import AWS from 'aws-sdk';

// Configuración de DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'local',
    endpoint: 'http://localhost:8000'
});

// Datos a insertar
const data = [
    { TableName: 'Books', Item: { id: '1', title: '1984', author: 'George Orwell' } },
    { TableName: 'Books', Item: { id: '2', title: 'Brave New World', author: 'Aldous Huxley' } },
    { TableName: 'Cars', Item: { id: '1', make: 'Tesla', model: 'Model S' } },
    { TableName: 'Cars', Item: { id: '2', make: 'Toyota', model: 'Corolla' } }
];

async function createTableIfNotExists(tableName: string, keySchema: AWS.DynamoDB.KeySchema, attributeDefinitions: AWS.DynamoDB.AttributeDefinitions): Promise<void> {
    const describeParams: AWS.DynamoDB.DescribeTableInput = {
        TableName: tableName
    };

    try {
        await dynamoDB.describeTable(describeParams).promise();
    } catch (error) {
        if (error.code === 'ResourceNotFoundException') {
            console.log(`Table ${tableName} does not exist, creating...`);

            const createParams: AWS.DynamoDB.CreateTableInput = {
                TableName: tableName,
                KeySchema: keySchema,
                AttributeDefinitions: attributeDefinitions,
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            };

            await dynamoDB.createTable(createParams).promise();
            console.log(`Table ${tableName} created successfully.`);
        } else {
            throw error;
        }
    }
}

async function populate() {
    // Verifica la conexión a DynamoDB
    try {
        await dynamoDB.scan({ TableName: 'dummy' }).promise();
        console.log('Connected to DynamoDB');
    } catch (error) {
        console.error('Error connecting to DynamoDB:', error);
        return;
    }

    // Espera 5 segundos para dar tiempo a que se inicie DynamoDB localmente
    console.log('Waiting for 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Crea las tablas si no existen
    const booksKeySchema: AWS.DynamoDB.KeySchema = [
        { AttributeName: 'id', KeyType: 'HASH' }
    ];
    const booksAttributeDefinitions: AWS.DynamoDB.AttributeDefinitions = [
        { AttributeName: 'id', AttributeType: 'S' }
    ];
    await createTableIfNotExists('Books', booksKeySchema, booksAttributeDefinitions);

    const carsKeySchema: AWS.DynamoDB.KeySchema = [
        { AttributeName: 'id', KeyType: 'HASH' }
    ];
    const carsAttributeDefinitions: AWS.DynamoDB.AttributeDefinitions = [
        { AttributeName: 'id', AttributeType: 'S' }
    ];
    await createTableIfNotExists('Cars', carsKeySchema, carsAttributeDefinitions);

    // Inserta los datos en las tablas
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
