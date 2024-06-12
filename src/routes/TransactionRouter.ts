import express from 'express';
import TransactionController from '../controllers/TransactionController';

import { JwtMiddleware } from '../middleware/JwtMiddleware';

const TransactionRouter = express.Router();

TransactionRouter.get('/', TransactionController.getAllTransactions);
TransactionRouter.get('/security', [JwtMiddleware], TransactionController.getAllTransactions);
TransactionRouter.get('/:id', TransactionController.getTransactionById);
TransactionRouter.post('/', TransactionController.createTransaction);

export default TransactionRouter;
