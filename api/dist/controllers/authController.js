"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProtectedInfo = exports.login = void 0;
const config_1 = __importDefault(require("../config/config"));
const jwtUtils_1 = require("../utils/jwtUtils");
/**
 * Login controller - validates user credentials and returns JWT
 */
const login = (req, res) => {
    const { username, password } = req.body;
    // Validate request body
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
    // Check if user exists and password is correct
    // In production, this should use a database and proper password hashing
    const validUsers = config_1.default.users;
    if (!validUsers[username] || validUsers[username] !== password) {
        return res.status(401).json({ message: "Invalid username or password." });
    }
    // Generate JWT
    const { token, expiresAt } = (0, jwtUtils_1.generateToken)(username);
    return res.json({
        message: "Successful login.",
        jwt: token,
        expireAt: expiresAt
    });
};
exports.login = login;
/**
 * Protected route controller - returns user info from token
 */
const getProtectedInfo = (req, res) => {
    var _a;
    // If we got here, the JWT is valid (verified by middleware)
    return res.json({
        message: "Access granted!",
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.username
    });
};
exports.getProtectedInfo = getProtectedInfo;
//# sourceMappingURL=authController.js.map