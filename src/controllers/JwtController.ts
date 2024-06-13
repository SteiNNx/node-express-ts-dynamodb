import { Request, Response } from 'express';
import JwtToken from '../models/JwtToken';
import config from '../config/config';

class JwtController {

    public signBodyRequestToHashToken = async (req: Request, res: Response) => {
        try {
            const {
                body
            } = req;

            const body_hashed_token = JwtToken.sign(
                body
            );

            res.type('json')
                .send({
                    body_request: body,
                    body_hashed_token: body_hashed_token,
                    jwt_config: {
                        ...config.jwt
                    }
                });
        } catch (error) {
            console.error(error);
            res.status(500)
                .json({ error: 'An error occurred while signBodyRequestToHashToken.' });
        }
    }

    public verifyHashedBodyRequestCheck = async (req: Request, res: Response) => {
        try {
            const {
                token
            } = req?.body;

            const jwtPayload = JwtToken.verify(token);

            res.type('json')
                .send({
                    jwtPayload
                });
        } catch (error) {
            console.error(error);
            res.status(500)
                .json({ error: 'An error occurred while verifyHashedBodyRequestCheck.' });
        }
    }


}

export default new JwtController();
