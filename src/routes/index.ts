import { Router } from 'express';
import AuthRouter from './AuthRouter';
import JwtRouter from './JwtRouter';
import TransactionRouter from './TransactionRouter';

const routes = Router();

routes.use('/auth', AuthRouter);
routes.use('/jwt', JwtRouter);
routes.use('/transaction', TransactionRouter);

export default routes;