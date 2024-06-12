import DynamoDB from '../DynamoDB';
import { transactionsItems } from './Data'

const transactionsTableName: string = 'Transactions';
const transactionsKeySchema: AWS.DynamoDB.KeySchema = [{ AttributeName: 'TransactionId', KeyType: 'HASH' }];
const transactionsAttributeDefinitions: AWS.DynamoDB.AttributeDefinitions = [{ AttributeName: 'TransactionId', AttributeType: 'S' }];

async function RunSeeder() {

    console.group('RunSeeder');
    console.log('**************Seeder::RunSeeder**************');

    await createTable(transactionsTableName, transactionsKeySchema, transactionsAttributeDefinitions);
    for (const transactionIteration of transactionsItems) {
        await populate(transactionsTableName, transactionIteration);
    }

    console.groupEnd();
}

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
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };

    console.group('CreateTable');
    console.log('**************Seeder::createTable**************');
    console.log({ createParams });

    return new Promise((resolve, reject) => {
        DynamoDB.createTable(createParams, function (err: AWS.AWSError, data: AWS.DynamoDB.CreateTableOutput) {
            if (err) {
                console.log("DynamoDB Error: ", err);
                reject(err);
            } else {
                console.log("Table Created", data);
                resolve(data);
            }
        });
        console.groupEnd();
    });
}

async function populate(
    nameSchema: string,
    item
) {
    const insertParams: AWS.DynamoDB.Types.PutItemInput = {
        TableName: nameSchema,
        Item: item,
    };

    console.group('Populate');
    console.log('**************Seeder::populate**************');
    console.log({ insertParams });

    return new Promise((resolve, reject) => {
        DynamoDB.putItem(insertParams, function (err: AWS.AWSError, data: AWS.DynamoDB.Types.PutItemOutput) {
            if (err) {
                console.log("DynamoDB Error: ", err);
                reject(err);
            } else {
                console.log("Success", data);
                resolve(data);
            }
        });
        console.groupEnd();
    });
}

export default RunSeeder;
