import jwt from 'jsonwebtoken';
import config from '../config/config';

export interface UserPayload {
    username: string;
}

export interface JwtPayload {
    iss: string;
    aud: string;
    iat: number;
    nbf: number;
    exp: number;
    data: UserPayload;
}

/**
 * Generate a JWT token for a user
 */
export const generateToken = (username: string): { token: string; expiresAt: number } => {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + config.jwt.expiry;

    const payload: JwtPayload = {
        iss: config.jwt.issuer,
        aud: config.jwt.audience,
        iat: issuedAt,
        nbf: issuedAt,
        exp: expiresAt,
        data: {
            username
        }
    };

    const token = jwt.sign(payload, config.jwt.secret);

    return {
        token,
        expiresAt
    };
};

/**
 * Verify a JWT token
 */
export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, config.jwt.secret) as JwtPayload;
};