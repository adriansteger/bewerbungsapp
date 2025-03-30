"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jwtUtils_1 = require("../utils/jwtUtils");
/**
 * Middleware to verify JWT token in the Authorization header
 */
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(' ')[1]; // Expecting "Bearer TOKEN_HERE"
    try {
        const decoded = (0, jwtUtils_1.verifyToken)(token);
        // Add the decoded user to the request object for use in route handlers
        req.user = decoded.data;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authMiddleware.js.map