import DynamoDB from '../DynamoDB';

const booksNameSchema: string = 'Books';
const booksKeySchema: AWS.DynamoDB.KeySchema = [
    { AttributeName: 'id', KeyType: 'HASH' }
];
const booksAttributeDefinitions: AWS.DynamoDB.AttributeDefinitions = [
    { AttributeName: 'id', AttributeType: 'S' }
];

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

async function RunSeeder() {

    console.group('RunSeeder');
    console.log('**************Seeder::RunSeeder**************');

    await createTable(booksNameSchema, booksKeySchema, booksAttributeDefinitions);
    for (const item of booksItems) {
        await populate(booksNameSchema, item);
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
    item: AWS.DynamoDB.PutItemInputAttributeMap
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
