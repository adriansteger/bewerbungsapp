"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mailerController_1 = require("../controllers/mailerController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Protected mailer route - requires JWT authentication
router.post('/send', authMiddleware_1.authenticateJWT, mailerController_1.sendMail);
exports.default = router;
//# sourceMappingURL=mailerRoutes.js.map