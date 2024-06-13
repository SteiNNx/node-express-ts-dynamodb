import { WebHookService } from '../services/WebHookService';

export class WebHookController {
    private webHookService: WebHookService;

    constructor() {
        this.webHookService = new WebHookService();
    }

    public async sendMessageToTeams(): Promise<void> {
        await this.webHookService.sendTeamsMessage('title_title', 'message message message message message');
    }
}
