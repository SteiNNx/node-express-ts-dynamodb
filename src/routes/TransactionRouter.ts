import express from 'express';
import TransactionController from '../controllers/TransactionController';

const TransactionRouter = express.Router();

TransactionRouter.get('/', TransactionController.getAllTransactions);
TransactionRouter.get('/:id', TransactionController.getTransactionById);
TransactionRouter.post('/', TransactionController.createTransaction);

export default TransactionRouter;
