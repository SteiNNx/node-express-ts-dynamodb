import { Request, Response } from 'express';
import JwtToken from '../models/JwtToken';
import config from '../config/config';

class JwtUtilitiesController {

    public signBodyRequestToHashToken = async (req: Request, res: Response) => {
        try {
            const {
                body
            } = req;

            const token = JwtToken.sign(
                body
            );

            console.log({ req });
            console.log({ body });



            res.type('json')
                .send({
                    body_request: body,
                    body_token_hashed: token,
                    jwt_config: {
                        ...config.jwt
                    }
                });
        } catch (error) {
            console.error(error);
            res.status(500)
                .json({ error: 'An error occurred while login.' });
        }
    }
}

export default new JwtUtilitiesController();
