import { Router } from 'express';
import { getUserDetailsById } from './user.service';

const router = Router();

router.get('/:userId', getUserDetailsById);

export default router;
