import { DynamoDBDocumentClient } from '../database/DynamoDB';
import Transaction from '../models/schema/Transaction';
import { SCHEMA_TABLE_NAME_TRANSACTION } from '../constants/Constants';

export class TransactionService {

    public async getAllTransactions(): Promise<Transaction[]> {
        const params = {
            TableName: SCHEMA_TABLE_NAME_TRANSACTION
        };

        const result = await DynamoDBDocumentClient.scan(params).promise();
        return result.Items as Transaction[];
    }

    public async getTransactionById(id: string): Promise<Transaction | null> {
        const params = {
            TableName: SCHEMA_TABLE_NAME_TRANSACTION,
            Key: { id }
        };

        const result = await DynamoDBDocumentClient.get(params).promise();
        return result.Item as Transaction || null;
    }

    public async createTransaction(transaction: Transaction): Promise<void> {
        const params = {
            TableName: SCHEMA_TABLE_NAME_TRANSACTION,
            Item: transaction
        };

        await DynamoDBDocumentClient.put(params).promise();
    }
}

export default TransactionService;
