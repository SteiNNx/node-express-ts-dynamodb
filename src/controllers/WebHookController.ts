import { Request, Response } from 'express';
import { WebHookService } from '../services/WebHookService';
import { HttpStatus } from '../constants/HttpStatusConstants';

class WebHookController {
    private webHookService: WebHookService;

    constructor() {
        this.webHookService = new WebHookService();
    }

    public sendMessageToTeams = async (req: Request, res: Response) => {
        try {

            await this.webHookService.sendTeamsMessage('title_title', 'message message message message message');
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'An error occurred while login.' });
        }
    }
}

export default new WebHookController();