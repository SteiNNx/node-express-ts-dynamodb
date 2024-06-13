import { Request, Response } from 'express';
import JwtTokenService from '../services/JwtTokenService';
import { HttpStatus } from '../constants/HttpStatusConstants';
class AuthController {

    public login = async (req: Request, res: Response) => {
        try {
            let {
                username,
                password,
            } = req.body;

            console.log(`login: ${username}`);

            const token = JwtTokenService.sign(
                {
                    userId: 'pepito gonzalez', //username
                    username: 'pep.gonz', //password
                    role: 'admin'
                }
            );

            res.status(HttpStatus.OK)
                .type('json')
                .send({ token: token });
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ error: 'An error occurred while login.' });
        }
    };
}

export default new AuthController();
