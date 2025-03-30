import { Router } from 'express';
import { sendMail } from '../controllers/mailerController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

// Protected mailer route - requires JWT authentication
router.post('/send', authenticateJWT, sendMail);

export default router;