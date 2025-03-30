"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Login route
router.post('/login', authController_1.login);
// Protected route
router.get('/protected', authMiddleware_1.authenticateJWT, authController_1.getProtectedInfo);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map