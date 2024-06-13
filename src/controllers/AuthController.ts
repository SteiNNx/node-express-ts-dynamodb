import { Request, Response } from 'express';
import JwtToken from '../models/JwtToken';

class AuthController {

    public login = async (req: Request, res: Response) => {
        try {
            let {
                username,
                password,
            } = req.body;

            console.log(`login: ${username}`);

            const token = JwtToken.sign(
                {
                    userId: 'pepito gonzalez',
                    username: 'pep.gonz',
                    role: 'admin'
                }
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
