import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import JwtToken from '../services/JwtTokenService';
import { HttpStatus } from '../constants/HttpStatusConstants';
import { REQUEST_HEADER_AUTHORIZATION } from '../constants/Constants';

// Definir una interfaz para extender la interfaz Request de Express
export interface CustomRequest extends Request {
    token: JwtPayload;
}

// Middleware para verificar y decodificar el token JWT
export const JwtMiddleware = (req: Request, res: Response, next: NextFunction) => {

    // Obtener el token de autorización del encabezado
    const headerAuthorizationString = <string>req.headers[`${REQUEST_HEADER_AUTHORIZATION}`];
    const tokenString = headerAuthorizationString?.split(' ')[1];
    let jwtPayload;

    try {
        // Verificar y decodificar el token JWT
        jwtPayload = JwtToken.verify(tokenString);

        (req as CustomRequest).token = jwtPayload; // Añadir el payload decodificado a la solicitud
    } catch (error) {
        // Manejar el error si el token es inválido o está ausente
        res.status(HttpStatus.UNAUTHORIZED)
            .type('json')
            .send(JSON.stringify({ message: 'Missing or invalid token' }));
        return;
    }

    next(); // Pasar al siguiente middleware o ruta
};
