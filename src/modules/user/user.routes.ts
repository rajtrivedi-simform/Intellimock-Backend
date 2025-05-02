import { Router } from 'express';
import { getUserDetailsById, userProfile } from './user.service';

const router = Router();

router.get('/', getUserDetailsById);
router.post('/user-profile', userProfile);

export default router;
