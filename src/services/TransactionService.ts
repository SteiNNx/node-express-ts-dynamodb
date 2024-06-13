import { DynamoDBDocumentClient } from '../database/DynamoDB';
import Transaction from '../models/schema/Transaction';

export class TransactionService {
    private tableName = 'Transactions';

    public async getAllTransactions(): Promise<Transaction[]> {
        const params = {
            TableName: this.tableName
        };

        const result = await DynamoDBDocumentClient.scan(params).promise();
        return result.Items as Transaction[];
    }

    public async getTransactionById(id: string): Promise<Transaction | null> {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };

        const result = await DynamoDBDocumentClient.get(params).promise();
        return result.Item as Transaction || null;
    }

    public async createTransaction(transaction: Transaction): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: transaction
        };

        await DynamoDBDocumentClient.put(params).promise();
    }
}

export default TransactionService;
