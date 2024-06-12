import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import config from '../config/config';

class AuthController {

    public login = async (req: Request, res: Response) => {
        try {
            let {
                username,
                password,
            } = req.body;

            console.log(`login: ${username}`);

            const token = sign(
                {
                    userId: 'pepito gonzalez',
                    username: 'pep.gonz',
                    role: 'admin'
                },
                config.jwt.secret!,
                {
                    expiresIn: '1h',
                    notBefore: '0', // Cannot use before now, can be configured to be deferred.
                    algorithm: 'HS256',
                    audience: config.jwt.audience,
                    issuer: config.jwt.issuer
                },
            );

            res.type('json')
                .send({ token: token });
        } catch (error) {
            console.error(error);
            res.status(500)
                .json({ error: 'An error occurred while login.' });
        }
    };
}

export default new AuthController();
