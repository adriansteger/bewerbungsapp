import { Router } from 'express';
import { login, getProtectedInfo } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

// Login route
router.post('/login', login);

// Protected route
router.get('/protected', authenticateJWT, getProtectedInfo);

export default router;