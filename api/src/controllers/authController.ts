import { Request, Response } from 'express';
import config from '../config/config';
import { generateToken } from '../utils/jwtUtils';

/**
 * Login controller - validates user credentials and returns JWT
 */
export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    // Check if user exists and password is correct
    // In production, this should use a database and proper password hashing
    const validUsers = config.users as Record<string, string>;

    if (!validUsers[username] || validUsers[username] !== password) {
        return res.status(401).json({ message: "Invalid username or password." });
    }

    // Generate JWT
    const { token, expiresAt } = generateToken(username);

    return res.json({
        message: "Successful login.",
        jwt: token,
        expireAt: expiresAt
    });
};

/**
 * Protected route controller - returns user info from token
 */
export const getProtectedInfo = (req: Request, res: Response) => {
    // If we got here, the JWT is valid (verified by middleware)
    return res.json({
        message: "Access granted!",
        user: req.user?.username
    });
};