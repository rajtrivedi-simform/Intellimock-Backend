import { Router } from 'express';
import {  getInterviews, getQuestions } from './interviews.service';

const router = Router();

router.get('/', getInterviews);
// router.post('/', generateInterview);
router.post('/get-question', getQuestions);
// router.post('/generate-mockinterview', generateMockInterview)

export default router;
