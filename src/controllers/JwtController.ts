import { Request, Response } from 'express';
import JwtTokenService from '../services/JwtTokenService';
import config from '../config/config';
import { HttpStatus } from '../constants/HttpStatusConstants';

class JwtController {

    public signBodyRequestToHashToken = async (req: Request, res: Response) => {
        try {
            const {
                body
            } = req;

            const body_hashed_token = JwtTokenService.sign(
                body
            );

            res.type('json')
                .status(HttpStatus.OK)
                .send({
                    body_request: body,
                    body_hashed_token: body_hashed_token,
                    jwt_config: {
                        ...config.jwt
                    }
                });
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'An error occurred while signBodyRequestToHashToken.' });
        }
    }

    public verifyHashedBodyRequestCheck = async (req: Request, res: Response) => {
        try {
            const {
                token
            } = req?.body;

            const jwtPayload = JwtTokenService.verify(token);

            res.type('json')
                .status(HttpStatus.OK)
                .send({
                    jwtPayload
                });
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'An error occurred while verifyHashedBodyRequestCheck.' });
        }
    }


}

export default new JwtController();
