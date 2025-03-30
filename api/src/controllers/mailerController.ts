import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import config from '../config/config';

interface MailerRequestBody {
    bewerbender: string;
    beruf: string;
    jobbeschreibung?: string;
    geschlecht?: string;
    nachname?: string;
}

/**
 * Mailer controller - sends email with application data
 */
export const sendMail = async (req: Request, res: Response) => {
    const { bewerbender, beruf, jobbeschreibung, geschlecht, nachname } = req.body as MailerRequestBody;

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
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.email.from || await createTestAccount(),
                pass: process.env.EMAIL_PASSWORD || await createTestAccount(true)
            }
        });

        // Message content
        const message = `${beruf} ${jobbeschreibung || ""} ${geschlecht || ""} ${nachname || ""}`;

        // Send mail
        const info = await transporter.sendMail({
            from: config.email.from || '"Bewerbungsapp" <no-reply@example.com>',
            to: config.email.to || 'recipient@example.com',
            subject: bewerbender,
            html: message
        });

        return res.json({
            sent: true,
            message: "Mail successfully sent.",
            messageId: info.messageId
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({
            sent: false,
            message: "Mail sending failed."
        });
    }
};

// Helper function to create a test account for development
const createTestAccount = async (returnPassword = false): Promise<string> => {
    const testAccount = await nodemailer.createTestAccount();
    return returnPassword ? testAccount.pass : testAccount.user;
};