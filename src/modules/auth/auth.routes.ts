import { Router } from 'express';
import { userLogin, userRegister, authStatus, logout } from './auth.service';

const router = Router();

router.post('/login', userLogin);
router.post('/register', userRegister);
router.get('/logout', logout);
router.get('/auth/status', authStatus);

export default router;
