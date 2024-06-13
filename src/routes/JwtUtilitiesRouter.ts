import express from 'express';
import JwtUtilitiesController from '../controllers/JwtUtilitiesController';

const JwtUtilitiesRouter = express.Router();

JwtUtilitiesRouter.post('/sign-body-request-to-hash-token', JwtUtilitiesController.signBodyRequestToHashToken);

export default JwtUtilitiesRouter;
