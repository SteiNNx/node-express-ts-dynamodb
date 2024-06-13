import express from 'express';
import JwtController from '../controllers/JwtController';

const JwtRouter = express.Router();

JwtRouter.post('/sign-body-request-to-hash-token', JwtController.signBodyRequestToHashToken);
JwtRouter.post('/verify-hashed-body-request-check', JwtController.verifyHashedBodyRequestCheck);

export default JwtRouter;
