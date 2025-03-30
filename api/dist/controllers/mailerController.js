"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
/**
 * Mailer controller - sends email with application data
 */
const sendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bewerbender, beruf, jobbeschreibung, geschlecht, nachname } = req.body;
    // Validate request body
    if (!bewerbender || !beruf) {
        return res.status(400).json({
            sent: false,
            message: "Missing required fields."
        });
    }
    // For development/testing, we're creating a test account with Ethereal
    // In production, you'd use your actual SMTP settings
    try {
        // Create reusable transporter
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: config_1.default.email.from || (yield createTestAccount()),
                pass: process.env.EMAIL_PASSWORD || (yield createTestAccount(true))
            }
        });
        // Message content
        const message = `${beruf} ${jobbeschreibung || ""} ${geschlecht || ""} ${nachname || ""}`;
        // Send mail
        const info = yield transporter.sendMail({
            from: config_1.default.email.from || '"Bewerbungsapp" <no-reply@example.com>',
            to: config_1.default.email.to || 'recipient@example.com',
            subject: bewerbender,
            html: message
        });
        return res.json({
            sent: true,
            message: "Mail successfully sent.",
            messageId: info.messageId
        });
    }
    catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
            sent: false,
            message: "Mail sending failed."
        });
    }
});
exports.sendMail = sendMail;
// Helper function to create a test account for development
const createTestAccount = (returnPassword = false) => __awaiter(void 0, void 0, void 0, function* () {
    const testAccount = yield nodemailer_1.default.createTestAccount();
    return returnPassword ? testAccount.pass : testAccount.user;
});
//# sourceMappingURL=mailerController.js.map