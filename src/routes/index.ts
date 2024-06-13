import { Router } from 'express';
import AuthRouter from './AuthRouter';
import JwtRouter from './JwtRouter';
import TransactionRouter from './TransactionRouter';
import WebHookRouter from './WebHookRouter';

const routes = Router();

routes.use('/auth', AuthRouter);
routes.use('/jwt', JwtRouter);
routes.use('/transaction', TransactionRouter);
routes.use('/webhook', WebHookRouter);

export default routes;