import { Router } from 'express';
import {
  generateCodeInterview,
  generateMockInterview,
  getInterviews,
  generateMockFeedback,
} from './interviews.service';

const router = Router();

router.get('/', getInterviews);
router.post('/generate-mockinterview', generateMockInterview);
router.post('/get-mock-feedback', generateMockFeedback);
router.post('/generate-codeinterview', generateCodeInterview);

export default router;
