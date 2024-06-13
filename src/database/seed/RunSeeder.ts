import DynamoDB from '../DynamoDB'; // Importar la instancia de DynamoDB

// Importar los datos de transacciones
import { transactionsItems } from './Data';

// Definir el nombre de la tabla de transacciones
const transactionsTableName: string = 'Transactions';

// Definir el esquema de clave para la tabla de transacciones
const transactionsKeySchema: AWS.DynamoDB.KeySchema = [{ AttributeName: 'TransactionId', KeyType: 'HASH' }];

// Definir las definiciones de atributos para la tabla de transacciones
const transactionsAttributeDefinitions: AWS.DynamoDB.AttributeDefinitions = [{ AttributeName: 'TransactionId', AttributeType: 'S' }];

// Función para ejecutar el seeder
async function RunSeeder() {

    console.group('RunSeeder'); // Iniciar grupo de consola
    console.log('**************Seeder::RunSeeder**************'); // Mensaje de inicio de ejecución

    // Crear la tabla de transacciones
    await createTable(transactionsTableName, transactionsKeySchema, transactionsAttributeDefinitions);

    // Llenar la tabla con los datos de transacciones
    for (const transactionIteration of transactionsItems) {
        await populate(transactionsTableName, transactionIteration);
    }

    console.groupEnd(); // Finalizar grupo de consola
}

// Función para crear una tabla en DynamoDB
async function createTable(
    nameSchema: string,
    keySchema: AWS.DynamoDB.KeySchema,
    attributeDefinitions: AWS.DynamoDB.AttributeDefinitions,
) {
    const createParams: AWS.DynamoDB.CreateTableInput = {
        TableName: nameSchema,
        KeySchema: keySchema,
        AttributeDefinitions: attributeDefinitions,
        ProvisionedThroughput: {
            ReadCapacityUnits: 5, // Unidades de capacidad de lectura
            WriteCapacityUnits: 5 // Unidades de capacidad de escritura
        }
    };

    console.group('CreateTable'); // Iniciar grupo de consola
    console.log('**************Seeder::createTable**************'); // Mensaje de inicio de creación de tabla
    console.log({ createParams }); // Mostrar parámetros de creación

    return new Promise((resolve, reject) => {
        // Crear la tabla en DynamoDB
        DynamoDB.createTable(createParams, function (err: AWS.AWSError, data: AWS.DynamoDB.CreateTableOutput) {
            if (err) {
                console.log("DynamoDB Error: ", err);
                reject(err);
            } else {
                console.log("Table Created", data);
                resolve(data);
            }
        });
        console.groupEnd(); // Finalizar grupo de consola
    });
}

// Función para llenar la tabla con datos
async function populate(
    nameSchema: string,
    item
) {
    const insertParams: AWS.DynamoDB.Types.PutItemInput = {
        TableName: nameSchema,
        Item: item,
    };

    console.group('Populate'); // Iniciar grupo de consola
    console.log('**************Seeder::populate**************'); // Mensaje de inicio de inserción
    console.log({ insertParams }); // Mostrar parámetros de inserción

    return new Promise((resolve, reject) => {
        // Insertar el item en la tabla de DynamoDB
        DynamoDB.putItem(insertParams, function (err: AWS.AWSError, data: AWS.DynamoDB.Types.PutItemOutput) {
            if (err) {
                console.log("DynamoDB Error: ", err);
                reject(err);
            } else {
                console.log("Success", data);
                resolve(data);
            }
        });
        console.groupEnd(); // Finalizar grupo de consola
    });
}

export default RunSeeder; // Exportar la función RunSeeder como exportación por defecto
