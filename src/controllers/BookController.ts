import express from 'express';
import BookService from '../services/BookService';

const bookService = new BookService();
export const router = express.Router();

router.get('/', async (req, res) => {
    const books = await bookService.getAllBooks();
    res.json(books);
});

router.get('/:id', async (req, res) => {
    const book = await bookService.getBookById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

router.post('/', async (req, res) => {
    const book = req.body;
    await bookService.createBook(book);
    res.status(201).send('Book created');
});

export default router;
