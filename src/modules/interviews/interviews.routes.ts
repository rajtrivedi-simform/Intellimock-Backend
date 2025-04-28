import { Router } from 'express';
import {
  generateCodeInterview,
  generateMockInterview,
  getInterviews,
  getQuestions,
} from './interviews.service';

const router = Router();

router.get('/', getInterviews);
router.post('/get-question', getQuestions);
router.post('/generate-mockinterview', generateMockInterview);
router.post('/generate-codeinterview', generateCodeInterview);

export default router;
