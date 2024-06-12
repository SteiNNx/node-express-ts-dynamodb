import { Router } from 'express';
import AuthRouter from './AuthRouter';
import TransactionRouter from './TransactionRouter';

const routes = Router();

routes.use('/auth', AuthRouter);
routes.use('/transaction', TransactionRouter);

export default routes;