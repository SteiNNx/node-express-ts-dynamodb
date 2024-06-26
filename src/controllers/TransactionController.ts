import { Request, Response } from 'express';
import TransactionService from '../services/TransactionService';
import { HttpStatus } from '../constants/HttpStatusConstants';

class TransactionController {
    private TransactionService: TransactionService;

    constructor() {
        this.TransactionService = new TransactionService();
    }

    public getAllTransactions = async (req: Request, res: Response) => {
        try {
            const transaction = await this.TransactionService.getAllTransactions();
            res.json(transaction);
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'An error occurred while fetching transaction.' });
        }
    };

    public getTransactionById = async (req: Request, res: Response) => {
        try {
            const transaction = await this.TransactionService.getTransactionById(req.params.id);
            if (transaction) {
                res.json(transaction);
            } else {
                res.status(HttpStatus.NOT_FOUND)
                    .send('transaction not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500)
                .json({ error: 'An error occurred while fetching the transaction.' });
        }
    };

    public createTransaction = async (req: Request, res: Response) => {
        try {
            const transaction = req.body;
            await this.TransactionService.createTransaction(transaction);
            res.status(HttpStatus.CREATED)
                .send('transaction created');
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'An error occurred while creating the transaction.' });
        }
    };
}

export default new TransactionController();
