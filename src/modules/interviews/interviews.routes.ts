import { Router } from 'express';
import { generateInterview, getInterviews } from './interviews.service';

const router = Router();

router.get('/', getInterviews);
router.post('/', generateInterview);

export default router;
