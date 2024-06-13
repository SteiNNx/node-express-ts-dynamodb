import { WebHookClient } from '../provider/WebHookClient';

export class WebHookService {
    private WebHookClient: WebHookClient;

    constructor() {
        this.WebHookClient = new WebHookClient();
    }

    async callMoreIntent(){
        
    }

    async sendTeamsMessage(title: string, message: string): Promise<void> {
        await this.WebHookClient.sendMessage(
            title,
            message
        );
    }
}
