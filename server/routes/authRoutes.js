import express from 'express';
import { registerUser, loginUser, getMe, updateProfile, changePassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe);
router.put('/profile', updateProfile);
router.post('/change-password', changePassword);

export default router;
