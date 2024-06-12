import express from 'express';
import AuthController from '../controllers/AuthController';

import { JwtMiddleware } from '../middleware/JwtMiddleware';

const AuthRouter = express.Router();

AuthRouter.get('/login', AuthController.login);

export default AuthRouter;
