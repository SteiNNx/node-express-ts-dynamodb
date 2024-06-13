import { Router } from 'express';
import AuthRouter from './AuthRouter';
import JwtUtilitiesRouter from './JwtUtilitiesRouter';
import TransactionRouter from './TransactionRouter';

const routes = Router();

routes.use('/auth', AuthRouter);
routes.use('/util', JwtUtilitiesRouter);
routes.use('/transaction', TransactionRouter);

export default routes;