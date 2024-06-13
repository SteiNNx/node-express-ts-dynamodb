import express from 'express';
import AuthController from '../controllers/AuthController';

const AuthRouter = express.Router();

AuthRouter.get('/login', AuthController.login);

export default AuthRouter;
