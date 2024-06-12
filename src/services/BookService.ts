import { DynamoDBDocumentClient } from '../database/DynamoDB';
import Book from '../models/Book';
export class BookService {
    private tableName = 'Books';

    async getAllBooks(): Promise<Book[]> {
        const params = {
            TableName: this.tableName
        };

        const result = await DynamoDBDocumentClient.scan(params).promise();
        return result.Items as Book[];
    }

    async getBookById(id: string): Promise<Book | null> {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };

        const result = await DynamoDBDocumentClient.get(params).promise();
        return result.Item as Book || null;
    }

    async createBook(book: Book): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: book
        };

        await DynamoDBDocumentClient.put(params).promise();
    }
}

export default BookService;
