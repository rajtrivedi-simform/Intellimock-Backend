import { Router } from 'express';
import {
  generateCodeInterview,
  generateMockInterview,
  getInterviews,
  generateMockFeedback,
  terminateInterviewController,
} from './interviews.service';

const router = Router();

router.get('/', getInterviews);
router.post('/generate-mockinterview', generateMockInterview);
router.post('/get-mock-feedback', generateMockFeedback);
router.post('/generate-codeinterview', generateCodeInterview);
router.post('/terminate-mock-interview', terminateInterviewController);

export default router;
