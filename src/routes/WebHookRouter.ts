import express from 'express';
import WebHookController from '../controllers/WebHookController';

const WebHookRouter = express.Router();

WebHookRouter.post('/send-message', WebHookController.sendMessageToTeams);

export default WebHookRouter;
