import { Request, Response } from 'express';
import BookService from '../services/BookService';

class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    public getAllBooks = async (req: Request, res: Response) => {
        try {
            const books = await this.bookService.getAllBooks();
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching books.' });
        }
    };

    public getBookById = async (req: Request, res: Response) => {
        try {
            const book = await this.bookService.getBookById(req.params.id);
            if (book) {
                res.json(book);
            } else {
                res.status(404).send('Book not found');
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching the book.' });
        }
    };

    public createBook = async (req: Request, res: Response) => {
        try {
            const book = req.body;
            await this.bookService.createBook(book);
            res.status(201).send('Book created');
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating the book.' });
        }
    };
}

export default new BookController();
