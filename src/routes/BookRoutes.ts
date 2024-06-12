import express from 'express';
import BookController from '../controllers/BookController';

const BookRouter = express.Router();

BookRouter.get('/', BookController.getAllBooks);
BookRouter.get('/:id', BookController.getBookById);
BookRouter.post('/', BookController.createBook);

export default BookRouter;
