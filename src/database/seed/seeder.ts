// src/populateData.ts
import AWS from 'aws-sdk';

AWS.config.update({ region: "local" });

const ddb = new AWS.DynamoDB({
    apiVersion: "2024-06-11",
    endpoint: 'http://dynamodb:8000',
});

const booksNameSchema: string = 'Books';
const booksKeySchema: AWS.DynamoDB.KeySchema = [
    { AttributeName: 'id', KeyType: 'HASH' }
];
const booksAttributeDefinitions: AWS.DynamoDB.AttributeDefinitions = [
    { AttributeName: 'id', AttributeType: 'S' }
];

// Items to be populated
const booksItems = [
    {
        id: { S: '1' },
        title: { S: 'The Great Gatsby' },
        author: { S: 'F. Scott Fitzgerald' },
    },
    {
        id: { S: '2' },
        title: { S: 'To Kill a Mockingbird' },
        author: { S: 'Harper Lee' },
    },
    {
        id: { S: '3' },
        title: { S: '1984' },
        author: { S: 'George Orwell' },
    }
];

async function runSeeder() {
    await createTable(booksNameSchema, booksKeySchema, booksAttributeDefinitions);
    for (const item of booksItems) {
        await populate(booksNameSchema, item);
    }
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

    console.log({ createParams });

    return new Promise((resolve, reject) => {
        ddb.createTable(createParams, function (err: AWS.AWSError, data: AWS.DynamoDB.CreateTableOutput) {
            if (err) {
                console.log("Error", err);
                reject(err);
            } else {
                console.log("Table Created", data);
                resolve(data);
            }
        });
    });
}

async function populate(
    nameSchema: string,
    item: AWS.DynamoDB.PutItemInputAttributeMap
) {
    const insertParams: AWS.DynamoDB.Types.PutItemInput = {
        TableName: nameSchema,
        Item: item,
    };

    return new Promise((resolve, reject) => {
        ddb.putItem(insertParams, function (err: AWS.AWSError, data: AWS.DynamoDB.Types.PutItemOutput) {
            if (err) {
                console.log("Error", err);
                reject(err);
            } else {
                console.log("Success", data);
                resolve(data);
            }
        });
    });
}

export default runSeeder;
