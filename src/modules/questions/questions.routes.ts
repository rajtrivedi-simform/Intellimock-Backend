import { Router } from 'express';
import { fetchQuestions, fetchQuestion } from './questions.service';

const router = Router();

router.get('/get-questions', fetchQuestions);
router.get('/get-question/:id', fetchQuestion);

export default router;
