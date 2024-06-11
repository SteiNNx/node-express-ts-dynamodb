import AWS from 'aws-sdk';
import Book from '../models/Book';

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: 'local',
    endpoint: 'http://dynamodb:8000'
});

export class BookService {
    private tableName = 'Books';

    async getAllBooks(): Promise<Book[]> {
        const params = {
            TableName: this.tableName
        };

        const result = await dynamoDB.scan(params).promise();
        return result.Items as Book[];
    }

    async getBookById(id: string): Promise<Book | null> {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };

        const result = await dynamoDB.get(params).promise();
        return result.Item as Book || null;
    }

    async createBook(book: Book): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: book
        };

        await dynamoDB.put(params).promise();
    }
}

export default BookService;
