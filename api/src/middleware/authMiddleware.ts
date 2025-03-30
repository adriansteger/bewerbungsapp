import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

/**
 * Middleware to verify JWT token in the Authorization header
 */
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(' ')[1]; // Expecting "Bearer TOKEN_HERE"

    try {
        const decoded = verifyToken(token);
        // Add the decoded user to the request object for use in route handlers
        req.user = decoded.data;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

// Extend Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: {
                username: string;
            };
        }
    }
}