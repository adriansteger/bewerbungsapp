"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
/**
 * Generate a JWT token for a user
 */
const generateToken = (username) => {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + config_1.default.jwt.expiry;
    const payload = {
        iss: config_1.default.jwt.issuer,
        aud: config_1.default.jwt.audience,
        iat: issuedAt,
        nbf: issuedAt,
        exp: expiresAt,
        data: {
            username
        }
    };
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwt.secret);
    return {
        token,
        expiresAt
    };
};
exports.generateToken = generateToken;
/**
 * Verify a JWT token
 */
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwtUtils.js.map