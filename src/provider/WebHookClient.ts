import axios from 'axios';
import * as dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();

export class WebHookClient {
    private webhookUrl: string;

    constructor() {
        this.webhookUrl = config.webhook.webHookUrl || '';
        console.log(this.webhookUrl);
        console.log(config);

        if (!this.webhookUrl) {
            throw new Error('WEBHOOK_URL is not defined in .env');
        }
    }

    async sendMessage(title: string, message: string): Promise<void> {
        try {
            const payload = {
                "@type": "MessageCard",
                "@context": "http://schema.org/extensions",
                "summary": title,
                "themeColor": "0076D7",
                "sections": [{
                    "activityTitle": title,
                    "text": message
                }]
            };

            let response = '';
            await axios.post(this.webhookUrl, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((successResponse) => {
                    console.log('then');
                    console.log({ successResponse });
                })
                .catch((errorResponse) => {
                    console.log('catch');
                    console.log({ errorResponse });
                });

            console.log({ response });


            //if (response.status !== 200) {
            //    throw new Error(`Error: ${response.status} - ${response.statusText}`);
            //}

            console.log('Message sent successfully to Teams');
        } catch (error) {
            console.error('Failed to send message to Teams:', error);
        }
    }
}
