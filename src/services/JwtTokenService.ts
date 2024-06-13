import {
    sign,
    verify,
    JwtPayload,
    Algorithm,
} from 'jsonwebtoken';
import config from '../config/config';

// Documentación: @link https://www.npmjs.com/package/jsonwebtoken
// Pagina Oficial: @link https://jwt.io/
export class JwtTokenService {
    public static sign(payload: any): string {
        return sign(
            payload,
            config.jwt.secret,
            {
                expiresIn: config.jwt.expiresIn,
                algorithm: config.jwt.algorithm as Algorithm, // especificar el tipo de algoritmo
                audience: config.jwt.audience,
                issuer: config.jwt.issuer,
            }
        );
    }

    public static verify(token: string): JwtPayload {
        return verify(
            token,
            config.jwt.secret!,
            {
                complete: config.jwt.complete,
                audience: config.jwt.audience,
                issuer: config.jwt.issuer,
                algorithms: [config.jwt.algorithm as Algorithm],
                clockTolerance: config.jwt.clockTolerance,
                ignoreExpiration: config.jwt.ignoreExpiration,
                ignoreNotBefore: config.jwt.ignoreNotBefore,
            }
        ) as JwtPayload;
    }
}

export default JwtTokenService;
